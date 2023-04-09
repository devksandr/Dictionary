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
        if(_filesService.AddFiles(file))
        {
            return StatusCode(StatusCodes.Status201Created);
        }
        return StatusCode(StatusCodes.Status500InternalServerError);
    }
}