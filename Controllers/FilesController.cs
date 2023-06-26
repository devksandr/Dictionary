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

    [HttpPost]
    public ActionResult AddFiles([FromForm] FileCreateRequestDTO filesModel)
    {
        var result = _filesService.AddFiles(filesModel);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
    [HttpGet("{fileId}")]
    public ActionResult GetFile(int fileId)
    {
        var result = _filesService.GetFile(fileId);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
    [HttpGet]
    public ActionResult GetAllFilesInfo()
    {
        var result = _filesService.GetAllFilesInfo();
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
    [HttpDelete("{fileId}")]
    public ActionResult DeleteFile(int fileId)
    {
        var statusCode = _filesService.DeleteFile(fileId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}