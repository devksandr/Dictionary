using dict_react.Services.Interfaces;
using Microsoft.Extensions.Localization;
using System.Globalization;
using dict_react.Models.Enum;

namespace dict_react.Services;

public class LocalizationService : ILocalizationService
{
    private readonly IStringLocalizer<LocalizationService> _localizer;
    string _currentCultureCode;
    public string CurrentCultureCode 
    {
        get => _currentCultureCode; 
        set => _currentCultureCode = value;
    }


    public LocalizationService(IStringLocalizer<LocalizationService> localizer)
    {
        _localizer = localizer;
        CurrentCultureCode = CultureInfo.CurrentCulture.Name;
    }

    public Dictionary<string, string> GetPageLocalization(Page page)
    {
        ChangeCulture(CurrentCultureCode);
        var pageLocalization = new Dictionary<string, string>();
        switch (page)
        {
            case Page.Files:
                pageLocalization = new Dictionary<string, string>
                {
                    {"FilesList",  _localizer["FilesList"]},
                    {"FilesCount",  _localizer["FilesCount"]},
                    {"AddFiles",  _localizer["AddFiles"]}
                };
                break;
            case Page.File:
                break;
            case Page.Phrases:
                break;
            case Page.Menu:
                pageLocalization = new Dictionary<string, string>
                {
                    {"FilesItem",  _localizer["FilesItem"]},
                };
                break;
            default:
                break;
        }
        return pageLocalization;
    }

    public string GetCulture() => CurrentCultureCode;

    public void ChangeCulture(string code)
    {
        CurrentCultureCode = code;
        var cultureInfo = new CultureInfo(code);
        CultureInfo.CurrentCulture = cultureInfo;
        CultureInfo.CurrentUICulture = cultureInfo;
    }
}