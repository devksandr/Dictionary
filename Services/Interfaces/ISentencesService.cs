using dict_react.Models;
namespace dict_react.Services.Interfaces;

public interface ISentencesService
{
    IEnumerable<string> GetSentences(string fileName);
}