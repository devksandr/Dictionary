using dict_react.Models;
using dict_react.Models.Tables;
namespace dict_react.Services.Interfaces;

public interface IFilesService
{
    IEnumerable<Document> GetFilesNames();
    Document GetFileName(int fileId);
    Document AddFiles(FileModel file);
    bool DeleteFile(int fileId);
}