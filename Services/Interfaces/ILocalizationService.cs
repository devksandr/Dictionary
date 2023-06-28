using dict_react.Models.Enum;

namespace dict_react.Services.Interfaces;

public interface ILocalizationService
{
    Dictionary<string, Dictionary<string, string>> GetPageLocalization(Page page);
    string GetCulture();
    bool ChangeCulture(string code);
}