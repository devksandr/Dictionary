using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Database;
using System.Linq;

namespace dict_react.Services;

public class FilesService : IFilesService
{
    ApplicationContext _db;
    public FilesService(ApplicationContext db)
    {
        _db = db;
    }

    public bool AddFiles(Models.File file)
    {
        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.Name);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.FormFile.CopyTo(stream);
            }
        }
        catch (Exception)
        {
            return false;
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