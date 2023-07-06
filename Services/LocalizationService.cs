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
        try
        {
            ChangeCulture(CurrentCultureCode);
            var subPagesKeys = SelectPageLocalization(page);
            var pageLocalization = CreateLocalization(subPagesKeys);
            return pageLocalization;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public IEnumerable<Dictionary<string, Dictionary<string, string>>> GetAllPagesLocalization()
    {
        try
        {
            var localization = new List<Dictionary<string, Dictionary<string, string>>>();
            foreach (Page page in (Page[]) Enum.GetValues(typeof(Page)))
            {
                var pageLocalization = GetPageLocalization(page);
                localization.Add(pageLocalization);
            }
            return localization;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public string GetCulture() => CurrentCultureCode;

    public bool ChangeCulture(string code)
    {
        try
        {
            CurrentCultureCode = code;
            var cultureInfo = new CultureInfo(code);
            CultureInfo.CurrentCulture = cultureInfo;
            CultureInfo.CurrentUICulture = cultureInfo;
        }
        catch (Exception ex)
        {
            return false;
        }
        return true;
    }

    Dictionary<string, List<string>> SelectPageLocalization(Page page)
    {
        return page switch
        {
            Page.Files => new Dictionary<string, List<string>>
            {
                {"body", new List<string> 
                    { 
                        "FilesList", 
                        "FilesCount", 
                        "AddFiles"
                    }
                },
                {"modalAddFiles", new List<string> 
                    { 
                        "FilesAddModalHeaderAdd",
                        "FilesAddModalTextDragAndDrop",
                        "FilesAddModalButtonRemove",
                        "FilesAddModalButtonUpload",
                        "FilesAddModalButtonCancel"
                    }
                },
                {"modalRemoveFile", new List<string> 
                    { 
                        "FilesRemoveModalHeader",
                        "FilesRemoveModalText",
                        "FilesRemoveModalButtonYes",
                        "FilesRemoveModalButtonNo",
                    }
                },
                {"notification", new List<string> 
                    { 
                        "FilesNotificationErrorGetFilesList",
                        "FilesNotificationModalAddSelectDuplicate",
                        "FilesNotificationModalDelete",
                        "FilesNotificationModalDeleteError",
                        "FilesNotificationModalAdd",
                        "FilesNotificationModalAddError",
                        "FilesNotificationModalAddSubmitDuplicate",
                        "FilesNotificationModalAddSubmitMaxSize",
                        "FilesNotificationModalAddSubmitMaxName"
                    }
                }
            },
            Page.File => new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        {

                        }
                    },
                    {"panelSelectPhrase", new List<string> 
                        {
                            "FileSelectPhrasePanelHeader",
                            "FileSelectPhrasePanelButtonAdd"
                        }
                    },
                    {"panelAddPhrase", new List<string> 
                        {
                            "FileAddPhrasePanelInputCategory",
                            "FileAddPhrasePanelInputPhrase",
                            "FileAddPhrasePanelInputMeaning",
                            "FileAddPhrasePanelInputComment",
                            "FileAddPhrasePanelButtonUpdate",
                            "FileAddPhrasePanelButtonAdd",
                            "FileAddPhrasePanelInputValidationPhrase",
                            "FileAddPhrasePanelInputValidationMeaning"
                        }
                    },
                    {"notification", new List<string> 
                    { 
                        "FileNotificationPhrasePanelAdd",
                        "FileNotificationPhrasePanelUpdate"
                    }
                }
                },
            Page.Phrases => new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        {
                            "PhrasesBodyHeader"
                        }
                    },
                    {"notification", new List<string> 
                        {
                            "PhrasesNotificationDelete",
                            "PhrasesNotificationDeleteError",
                            "PhrasesNotificationGetPhraseInfoError"
                        }
                    }
                },
            Page.Menu => new Dictionary<string, List<string>>
                {
                    {"items", new List<string> 
                        { 
                            "MenuFilesItem", 
                            "MenuPhrasesItem", 
                            "MenuSettingsItem"
                        }
                    }
                },
            Page.Settings => new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        { 
                            "SettingsHeader", 
                            "SettingsLanguageLabel", 
                            "SettingsLanguageRussian", 
                            "SettingsLanguageEnglish", 
                            "SettingsButtonSave"
                        }
                    },
                    {"notification", new List<string> 
                        { 
                            "SettingsNotificationLanguageChange",
                            "SettingsNotificationLanguageChangeError"
                        }
                    }
                },
            Page.NotFound => new Dictionary<string, List<string>>
                {
                    {"body", new List<string> 
                        { 
                            "NotFoundPageText"
                        }
                    }
                },
            _ => new Dictionary<string, List<string>>()
        };
    }
    Dictionary<string, Dictionary<string, string>> CreateLocalization(Dictionary<string, List<string>> subPagesKeys) => 
        subPagesKeys.ToDictionary(
            entry => entry.Key, 
            entry => entry.Value
                .ToDictionary(k => k, k => _localizer[k].ToString())); 
}