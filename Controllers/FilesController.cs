using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models.DTO;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    IFilesService _filesService;
    ISentencesService _sentencesService;
    public FilesController(IFilesService filesService, ISentencesService sentencesService)
    {
        _filesService = filesService;
        _sentencesService = sentencesService;
    }

    [HttpGet("{fileId}")]
    public DocumentDTO_Response_GetSentences GetFile(int fileId)
    {
        var file = _filesService.GetFile(fileId);
        return file;
    }
    [HttpGet]
    public IEnumerable<DocumentDTO_Response_GetName> GetFilesNames()
    {
        var fileNames = _filesService.GetFilesNames();
        return fileNames;
    }
    [HttpPost]
    public IEnumerable<DocumentDTO_Response_GetName> AddFiles([FromForm] DocumentDTO_Request_AddText filesModel)
    {
        var documents = _filesService.AddFiles(filesModel);
        return documents;
    }
    [HttpDelete("{fileId}")]
    public ActionResult DeleteFile(int fileId)
    {
        var statusCode = _filesService.DeleteFile(fileId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}