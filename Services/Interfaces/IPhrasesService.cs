using dict_react.Models.Entity;
using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IPhrasesService
{
    public PhraseCreateResponseDTO AddPhrase(PhraseCreateRequestDTO phraseModel);
    public IEnumerable<Phrase> GetPhrasesNames();
    public PhraseDTO GetPhrase(int phraseId);
    public List<SentenceDTO_Response_GetForFile> GetPhrasesForSentence(int fileId);
    public bool UpdatePhrase(PhraseUpdateRequestDTO phraseModel);
    bool DeletePhrase(int phraseId);
}