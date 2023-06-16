using dict_react.Models.Enum;

namespace dict_react.Services.Interfaces;

public interface ILocalizationService
{
    Dictionary<string, string> GetPageLocalization(Page page);
    void ChangeCulture(string code);
}