using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SentencesController : ControllerBase
{
    ISentencesService _sentencesService;
    public SentencesController(ISentencesService sentencesService)
    {
        _sentencesService = sentencesService;
    }
}