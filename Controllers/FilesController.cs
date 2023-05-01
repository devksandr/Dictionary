using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    IFilesService _filesService;
    public FilesController(IFilesService filesService)
    {
        _filesService = filesService;
    }

    [HttpGet]
    public IEnumerable<string> GetFilesNames()
    {
        var fileNames = _filesService.GetFilesNames();
        return fileNames;
    }

    [HttpPost]
    public ActionResult AddFiles([FromForm] Models.File file)
    {
        var statusCode = _filesService.AddFiles(file) ? 
            StatusCode(StatusCodes.Status201Created) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }

    [HttpDelete("{fileName}")]
    public ActionResult DeleteFile(string fileName)
    {
        var statusCode = _filesService.DeleteFile(fileName) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}