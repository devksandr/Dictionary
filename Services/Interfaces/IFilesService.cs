using dict_react.Models;
using dict_react.Models.Tables;
namespace dict_react.Services.Interfaces;

public interface IFilesService
{
    IEnumerable<Document> GetFilesNames();
    Document GetFileName(int fileId);
    List<Document> AddFiles(AddFilesModel filesModel);
    bool DeleteFile(int fileId);
}