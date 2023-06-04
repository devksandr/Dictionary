using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models;
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

    [HttpPost]
    public ActionResult AddPhrase([FromForm] AddPhraseModel phraseModel)
    {
        var statusCode = _phrasesService.AddPhrase(phraseModel) ?
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }

    [HttpDelete("{phraseId}")]
    public ActionResult DeletePhrase(int phraseId)
    {
        var statusCode = _phrasesService.DeletePhrase(phraseId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}