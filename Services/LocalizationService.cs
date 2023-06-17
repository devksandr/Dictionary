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
        var phraseKeys = new List<string>();

        switch (page)
        {
            case Page.Files:
                phraseKeys.AddRange(new string[] 
                { 
                    "FilesList", 
                    "FilesCount", 
                    "AddFiles"
                });
                break;
            case Page.File:
                break;
            case Page.Phrases:
                break;
            case Page.Menu:
                phraseKeys.AddRange(new string[]
                { 
                    "MenuFilesItem", 
                    "MenuPhrasesItem", 
                    "MenuSettingsItem"
                });
                break;
            case Page.Settings:
                phraseKeys.AddRange(new string[] 
                { 
                    "SettingsHeader", 
                    "SettingsLanguageLabel", 
                    "SettingsLanguageRussian", 
                    "SettingsLanguageEnglish", 
                    "SettingsButtonSave"
                });
                break;
            default:
                break;
        }
        var pageLocalization = CreateLocalization(phraseKeys);
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

    Dictionary<string, string> CreateLocalization(List<string> phraseKeys) 
        => phraseKeys.ToDictionary(k => k, k => _localizer[k].ToString());
}