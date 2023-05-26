using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;

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
    public IEnumerable<Phrase> GetPhrases()
    {
        var phrases = _phrasesService.GetPhrases();
        return phrases;
    }

    [HttpPost]
    public ActionResult AddPhrase([FromForm] AddPhraseModel phraseModel)
    {
        var statusCode = _phrasesService.AddPhrase(phraseModel) ?
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }

    [HttpDelete("{phraseId}")]
    public ActionResult DeleteFile(int phraseId)
    {
        var statusCode = _phrasesService.DeletePhrase(phraseId) ? 
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}