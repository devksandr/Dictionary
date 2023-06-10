using dict_react.Models;
using dict_react.Models.Entity;
using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IPhrasesService
{
    public IEnumerable<Phrase> GetPhrasesNames();
    public PhraseDTO GetPhrase(int phraseId);
    public List<SentenceDTO_Response_GetForFile> GetPhrasesForSentence(int fileId);
    public SentenceDTO_Response_GetForFile AddPhrase(AddPhraseModel phraseModel);
    bool DeletePhrase(int phraseId);
}