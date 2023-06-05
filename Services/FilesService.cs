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

    public DocumentDTO_Response_GetSentences GetFile(int fileId)
    {
        var documentName = _db.Documents.Find(fileId).Name;

        var sentences = _db.Sentences
            .Where(s => s.DocumentId == fileId)
            .OrderBy(s => s.SentenceNum)
            .Select(s => new SentenceDTO { Id = s.Id, SentenceNum = s.SentenceNum, Data = s.Data})
            .ToList();

        DocumentDTO_Response_GetSentences documentDTO = new DocumentDTO_Response_GetSentences
        {
            Name = documentName,
            Sentences = sentences
        };

        return documentDTO;
    }
    public IEnumerable<DocumentDTO_Response_GetName> GetFilesNames()
    {
        var documentsDTO = new List<DocumentDTO_Response_GetName>();
        var documents = _db.Documents;
        foreach (var d in documents)
        {
            DocumentDTO_Response_GetName documentDTO = new DocumentDTO_Response_GetName 
            { 
                Id = d.Id, 
                Name = d.Name 
            };
            documentsDTO.Add(documentDTO);
        } 
        return documentsDTO;
    }
    public IEnumerable<DocumentDTO_Response_GetName> AddFiles(DocumentDTO_Request_AddText filesModel)
    {
        // todo Check duplicate

        var documentsDTO = new List<DocumentDTO_Response_GetName>();
        foreach (var file in filesModel.FormFiles)
        {
            Document document = new Document { Name = file.FileName };
            _db.Documents.Add(document);
            _db.SaveChanges();

            var text = "";
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                text = reader.ReadToEnd();
            }
            var sentences = SplitText(text);
            int sentenceNum = 0;
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

            DocumentDTO_Response_GetName documentDTO = new DocumentDTO_Response_GetName 
            { 
                Id = document.Id, 
                Name = document.Name 
            };
            documentsDTO.Add(documentDTO);
        }
        return documentsDTO;
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