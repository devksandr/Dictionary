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
    public Dictionary<string, Dictionary<string, string>> GetPageLocalization(Page page)
    {
        var value = _localizationService.GetPageLocalization(page);
        return value;
    }

    [HttpGet("culture")]
    public string GetCulture()
    {
        var code = _localizationService.GetCulture();
        return code;
    }

    [HttpPut("culture/{code}")]
    public void ChangeCulture(string code)
    {
        _localizationService.ChangeCulture(code);
    }
}