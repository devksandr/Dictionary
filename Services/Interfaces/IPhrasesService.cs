using dict_react.Models;
using dict_react.Models.Tables.Interfaces;
using dict_react.Models.Tables;
using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IPhrasesService
{
    public IEnumerable<Phrase> GetPhrasesNames();
    public PhraseDTO GetPhrase(int phraseId);
    public bool AddPhrase(AddPhraseModel phraseModel);
    bool DeletePhrase(int phraseId);
}