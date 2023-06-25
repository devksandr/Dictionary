using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models.Entity;
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

    [HttpGet]
    public IEnumerable<Phrase> GetPhrasesNames()
    {
        var phrases = _phrasesService.GetPhrasesNames();
        return phrases;
    }
    [HttpGet("{phraseId}")]
    public PhraseDTO GetPhrase(int phraseId)
    {
        var phrase = _phrasesService.GetPhrase(phraseId);
        return phrase;
    }
    [HttpGet("file/{fileId}")]
    public List<SentenceDTO_Response_GetForFile> GetPhrasesForSentence(int fileId)
    {
        var sentencePhrases = _phrasesService.GetPhrasesForSentence(fileId);
        return sentencePhrases;
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