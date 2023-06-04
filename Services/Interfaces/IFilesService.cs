using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IFilesService
{
    DocumentDTO_Response_GetSentences GetFile(int fileId);
    IEnumerable<DocumentDTO_Response_GetName> GetFilesNames();
    IEnumerable<DocumentDTO_Response_GetName> AddFiles(DocumentDTO_Request_AddText filesModel);
    bool DeleteFile(int fileId);
}