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

    public bool AddFiles(Models.File file)
    {
        bool saveToStorageState = false;
        bool saveToDBState = false;
        bool saveState = true;

        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.Name);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.FormFile.CopyTo(stream);
                saveToStorageState = true;
            }

            Document document = new Document { Name = file.Name };
            _db.Documents.Add(document);
            _db.SaveChanges();
            saveToDBState = true;
        }
        catch (Exception)
        {
            saveState = false;
            if(saveToStorageState)
            {
                // del file
            }
            if(saveToDBState)
            {
                // del row
            }
        }

        return saveState;
    }

    public bool DeleteFile(string fileName)
    {
        var wwwroot = _environment.WebRootPath;
        var filePath = Path.Combine(wwwroot, fileName);

        if(!@System.IO.File.Exists(filePath)) return false;
        if(fileName is null) return false;

        System.IO.File.Delete(filePath);

        int documentId = _db.Documents.First(d => d.Name == fileName).Id;
        var document = _db.Documents.Find(documentId);
        if(document is not null)
        {
            _db.Documents.Remove(document);
            _db.SaveChanges();
        }

        return true;
    }

    public IEnumerable<string> GetFilesNames()
    {
        var fileNames = _db.Documents
            .Select(d => d.Name);
        return fileNames;
    }
}