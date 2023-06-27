using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models.DTO;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhrasesController : ControllerBase
{
    IPhrasesService _phrasesService;
    public PhrasesController(IPhrasesService phrasesService)
    {
        _phrasesService = phrasesService;
    }

    [HttpPost]
    public ActionResult AddPhrase([FromForm] PhraseCreateRequestDTO phraseModel)
    {
        var result = _phrasesService.AddPhrase(phraseModel);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }

    [HttpGet("{phraseId}")]
    public ActionResult GetPhrase(int phraseId)
    {
        var result = _phrasesService.GetPhrase(phraseId);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
    [HttpGet]
    public ActionResult GetAllPhrasesInfo()
    {
        var result = _phrasesService.GetAllPhrasesInfo();
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
    [HttpGet("file/{fileId}")]
    public ActionResult GetAllPhrasesForFile(int fileId)
    {
        var result = _phrasesService.GetAllPhrasesForFile(fileId);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }

    [HttpPut("{phraseId}")]
    public ActionResult UpdatePhrase([FromForm] PhraseUpdateRequestDTO phraseModel)
    {
        var result = _phrasesService.UpdatePhrase(phraseModel);
        if(!result)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return NoContent();
    }

    [HttpDelete("{phraseId}")]
    public ActionResult DeletePhrase(int phraseId)
    {
        var statusCode = _phrasesService.DeletePhrase(phraseId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}