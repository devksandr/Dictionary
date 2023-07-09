using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IPhrasesService
{
    public PhraseCreateResponseDTO? AddPhrase(PhraseCreateRequestDTO phraseModel);
    public PhraseGetResponseDTO? GetPhrase(int phraseId);
    public IEnumerable<PhraseGetInfoResponseDTO>? GetAllPhrasesInfo();
    public IEnumerable<SentenceGetForFileResponseDTO>? GetAllPhrasesForFile(int fileId);
    public bool UpdatePhrase(PhraseUpdateRequestDTO phraseModel);
    bool DeletePhrase(int phraseId);
}