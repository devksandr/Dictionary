namespace dict_react.Models.DTO;

public class PhraseDTO
{
    public int Id { get; set; }
    public string? Data { get; set; }
    public string? SentenceCategory { get; set; }

    public List<PhraseMeaningDTO>? PhraseMeanings { get; set; } = new();
}