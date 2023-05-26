using dict_react.Models;
using dict_react.Models.Tables.Interfaces;
using dict_react.Models.Tables;

namespace dict_react.Services.Interfaces;

public interface IPhrasesService
{
    public IEnumerable<Phrase> GetPhrases();
    public bool AddPhrase(AddPhraseModel phraseModel);
    bool DeletePhrase(int phraseId);
}