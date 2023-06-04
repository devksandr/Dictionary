using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Models.DTO;
using dict_react.Database;
using System.Linq;
using System.Text.RegularExpressions;

namespace dict_react.Services;

public class FilesService : IFilesService
{
    private readonly ApplicationContext _db;
    private readonly IWebHostEnvironment _environment;

    public FilesService(ApplicationContext db, IWebHostEnvironment environment)
    {
        _db = db;
        _environment = environment;
    }

    public DocumentDTO_Response_GetSentences GetFile(int fileId)
    {
        var documentName = _db.Documents.Find(fileId).Name;

        var sentences = _db.Sentences
            .Where(s => s.DocumentId == fileId)
            .OrderBy(s => s.SentenceNum)
            .Select(s => s.Data)
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
            int sentenceNum = 1;
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
        // Need delete Sentences with current fileId except Phrase use Sentence
        var wwwroot = _environment.WebRootPath;
        var document = _db.Documents.Find(fileId);
        if(document is not null)
        {
            _db.Documents.Remove(document);
            _db.SaveChanges();
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