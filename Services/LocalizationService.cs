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

    public Dictionary<string, Dictionary<string, string>> GetPageLocalization(Page page)
    {
        ChangeCulture(CurrentCultureCode);
        var subPagesKeys = new Dictionary<string, List<string>>();

        switch (page)
        {
            case Page.Files:
                subPagesKeys = new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        { 
                            "FilesList", 
                            "FilesCount", 
                            "AddFiles"
                        }
                    },
                    {"modal", new List<string> 
                        { 
                            "FilesModalHeaderAdd",
                            "FilesModalTextDragAndDrop",
                            "FilesModalButtonRemove",
                            "FilesModalButtonUpload",
                            "FilesModalButtonCancel"
                        }
                    }
                };
                break;
            case Page.File:
                break;
            case Page.Phrases:
                break;
            case Page.Menu:
                subPagesKeys = new Dictionary<string, List<string>>
                {
                    {"items", new List<string> 
                        { 
                            "MenuFilesItem", 
                            "MenuPhrasesItem", 
                            "MenuSettingsItem"
                        }
                    }
                };
                break;
            case Page.Settings:
                subPagesKeys = new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        { 
                            "SettingsHeader", 
                            "SettingsLanguageLabel", 
                            "SettingsLanguageRussian", 
                            "SettingsLanguageEnglish", 
                            "SettingsButtonSave"
                        }
                    }
                };
                break;
            case Page.NotFound:
                subPagesKeys = new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        { 
                            "NotFoundPageText"
                        }
                    }
                };
                break;
            default:
                break;
        }
        var pageLocalization = CreateLocalization(subPagesKeys);
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

    Dictionary<string, Dictionary<string, string>> CreateLocalization(Dictionary<string, List<string>> subPagesKeys) => 
        subPagesKeys.ToDictionary(
            entry => entry.Key, 
            entry => entry.Value
                .ToDictionary(k => k, k => _localizer[k].ToString())); 
}