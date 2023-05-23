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

    [HttpPost]
    public ActionResult AddPhrase([FromForm] AddPhraseModel phraseModel)
    {
        var statusCode = _phrasesService.AddPhrase(phraseModel) ?
            StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status500InternalServerError);
        return statusCode;
    }
}