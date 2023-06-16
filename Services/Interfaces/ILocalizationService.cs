using dict_react.Models.Enum;

namespace dict_react.Services.Interfaces;

public interface ILocalizationService
{
    Dictionary<string, string> GetPageLocalization(Page page);
    string GetCulture();
    void ChangeCulture(string code);
}