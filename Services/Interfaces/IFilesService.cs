namespace dict_react.Services.Interfaces;

public interface IFilesService
{
    IEnumerable<string> GetFilesNames();
    bool AddFiles(Models.File file);
    bool DeleteFile(string fileName);
}