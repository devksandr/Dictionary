using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Database;
using System.Linq;

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

    public List<Document> AddFiles(AddFilesModel filesModel)
    {
        // todo Check duplicate

        var wwwroot = _environment.WebRootPath;
        var documents = new List<Document>();

        foreach (var file in filesModel.FormFiles)
        {
            Document document = new Document { Name = file.FileName };
            try
            {
                string path = Path.Combine(wwwroot, file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                _db.Documents.Add(document);
                _db.SaveChanges();
                documents.Add(document);
            }
            catch (Exception ex)
            {
                documents = null;
                throw;
            }
        }
        return documents;
    }

    public bool DeleteFile(int fileId)
    {
        var wwwroot = _environment.WebRootPath;
        var fileName = GetFileName(fileId).Name;
        var filePath = Path.Combine(wwwroot, fileName);

        if(!@System.IO.File.Exists(filePath)) return false;
        if(fileName is null) return false;

        System.IO.File.Delete(filePath);

        var document = _db.Documents.Find(fileId);
        if(document is not null)
        {
            _db.Documents.Remove(document);
            _db.SaveChanges();
        }

        return true;
    }

    public IEnumerable<Document> GetFilesNames()
    {
        var fileNames = _db.Documents;
        return fileNames;
    }
    public Document GetFileName(int fileId)
    {
        var file = _db.Documents.Find(fileId);
        return file;
    }
}