using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models.DTO;
using dict_react.Models.Enum;

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

    [HttpGet("page/{page}")]
    public ActionResult GetPageLocalization(Page page)
    {
        var result = _localizationService.GetPageLocalization(page);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }

    [HttpGet("culture")]
    public ActionResult GetCulture()
    {
        var result = _localizationService.GetCulture();
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }

    [HttpPut("culture/{code}")]
    public ActionResult ChangeCulture(string code)
    {
        var result = _localizationService.ChangeCulture(code);
        if(!result)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return NoContent();
    }
}