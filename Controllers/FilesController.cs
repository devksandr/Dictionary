using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
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

    [HttpGet]
    public IEnumerable<Document> GetFilesNames()
    {
        var fileNames = _filesService.GetFilesNames();
        return fileNames;
    }

   [HttpGet("{fileId}")]
    public FileDependenciesModel GetFile(int fileId)
    {
        var fileName = _filesService.GetFileName(fileId);
        var sentences = _sentencesService.GetSentences(fileName.Name);
        FileDependenciesModel file = new FileDependenciesModel() { Name = fileName.Name, Sentences = sentences};
        return file;
    }

    [HttpPost]
    public Document AddFiles([FromForm] FileModel file)
    {
        var document = _filesService.AddFiles(file);
        return document;
    }

    [HttpDelete("{fileId}")]
    public ActionResult DeleteFile(int fileId)
    {
        var statusCode = _filesService.DeleteFile(fileId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}