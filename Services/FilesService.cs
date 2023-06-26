using dict_react.Services.Interfaces;
using dict_react.Models.Entity;
using dict_react.Models.DTO;
using dict_react.Database;
using System.Text.RegularExpressions;

namespace dict_react.Services;

public class FilesService : IFilesService
{
    private readonly ApplicationContext _db;

    public FilesService(ApplicationContext db)
    {
        _db = db;
    }

    public IEnumerable<FileCreateResponseDTO> AddFiles(FileCreateRequestDTO filesModel)
    {
        // TODO Check duplicate

        using(var transaction = _db.Database.BeginTransaction())
        {
            try
            {
                var documentsDTO = new List<FileCreateResponseDTO>();
                foreach (var file in filesModel.FormFiles)
                {
                    var text = "";
                    using (var reader = new StreamReader(file.OpenReadStream()))
                    {
                        text = reader.ReadToEnd();
                    }
                    var sentences = SplitText(text);
                    int sentenceNum = 0;

                    Document document = new Document { Name = file.FileName };
                    _db.Documents.Add(document);
                    _db.SaveChanges();

                    foreach (var s in sentences)
                    {
                        Sentence sentence = new Sentence 
                        { 
                            DocumentId = document.Id, 
                            Data = s, 
                            SentenceNum = sentenceNum++
                        };
                        _db.Sentences.Add(sentence);
                        _db.SaveChanges();
                    }

                    FileCreateResponseDTO documentDTO = new FileCreateResponseDTO 
                    { 
                        FileId = document.Id, 
                        Name = document.Name 
                    };
                    documentsDTO.Add(documentDTO);
                }

                transaction.Commit();

                return documentsDTO;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }
    }
    public FileGetResponseDTO GetFile(int fileId)
    {
        try
        {
            var documentName = _db.Documents.Find(fileId).Name;

            var sentences = _db.Sentences
                .Where(s => s.DocumentId == fileId)
                .OrderBy(s => s.SentenceNum)
                .Select(s => new SentenceGetResponseDTO { SentenceId = s.Id, SentenceNum = s.SentenceNum, Data = s.Data})
                .ToList();

            FileGetResponseDTO documentDTO = new FileGetResponseDTO
            {
                FileId = fileId,
                Name = documentName,
                Sentences = sentences
            };

            return documentDTO;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    public IEnumerable<FileGetInfoResponseDTO> GetAllFilesInfo()
    {
        try
        {
            var documentsDTO = new List<FileGetInfoResponseDTO>();
            var documents = _db.Documents;
            foreach (var d in documents)
            {
                FileGetInfoResponseDTO documentDTO = new FileGetInfoResponseDTO 
                { 
                    FileId = d.Id, 
                    Name = d.Name 
                };
                documentsDTO.Add(documentDTO);
            } 
            return documentsDTO;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    public bool DeleteFile(int fileId)
    {
        using(var transaction = _db.Database.BeginTransaction())
        {
            try
            {
                var document = _db.Documents.Find(fileId);
                _db.Documents.Remove(document);
                _db.SaveChanges();

                var sentencesIdAll = _db.Sentences
                    .Where(s => s.DocumentId == fileId)
                    .Select(s => s.Id)
                    .ToList();
                var sentencesIdSave = _db.PhraseMeaningExamples
                    .Where(pme => sentencesIdAll.Contains(pme.SentenceId))
                    .Select(pme => pme.SentenceId);
                var SentencesIdDelete = sentencesIdAll
                    .Union(sentencesIdSave)
                    .Except(sentencesIdAll.Intersect(sentencesIdSave));
                foreach (var sentenceId in SentencesIdDelete)
                {
                    var sentence = new Sentence { Id = sentenceId };
                    _db.Remove(sentence);
                }
                _db.SaveChanges();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return false;
            }
        }
        return true;
    }

    IEnumerable<string> SplitText(string text)
    {
        var splitTextToSentencesPattern = @"(?<=[\.!\?])\s+";
        var sentences = Regex.Split(text, splitTextToSentencesPattern);
        return sentences.Where(s => !string.IsNullOrWhiteSpace(s)).Distinct().ToList();;
    }
}