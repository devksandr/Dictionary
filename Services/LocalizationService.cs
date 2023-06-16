using dict_react.Services.Interfaces;
using Microsoft.Extensions.Localization;
using System.Globalization;
using dict_react.Models.Enum;

namespace dict_react.Services;

public class LocalizationService : ILocalizationService
{
    private readonly IStringLocalizer<LocalizationService> _localizer;
    string _currentLocalizationCode;

    public LocalizationService(IStringLocalizer<LocalizationService> localizer)
    {
        _localizer = localizer;
        _currentLocalizationCode = CultureInfo.CurrentCulture.Name;
    }

    public Dictionary<string, string> GetPageLocalization(Page page)
    {
        ChangeCulture(_currentLocalizationCode);
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

    public void ChangeCulture(string code)
    {
        _currentLocalizationCode = code;
        var cultureInfo = new CultureInfo(code);
        CultureInfo.CurrentCulture = cultureInfo;
        CultureInfo.CurrentUICulture = cultureInfo;
    }
}