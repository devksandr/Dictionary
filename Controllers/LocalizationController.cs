using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocalizationController : ControllerBase
{
    ILocalizationService _localizationService;
    public LocalizationController(ILocalizationService localizationService)
    {
        _localizationService = localizationService;
    }

    [HttpGet("{code}")]
    public ActionResult GetAllPagesLocalization(string code)
    {
        var result = _localizationService.GetAllPagesLocalization(code);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
}