namespace dict_react.Models.DTO;

public class PhraseGetResponseDTO
{
    public int PhraseId { get; set; }
    public string? Data { get; set; }
    public string? SentenceCategory { get; set; }

    public List<PhraseMeaningGetResponseDTO>? PhraseMeanings { get; set; } = new();
}