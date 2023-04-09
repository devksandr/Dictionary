namespace dict_react.Models.Tables;

public class Phrase
{
    public int Id { get; set; }
    public string? Data { get; set; }
    public int SentenceCategoryId { get; set; }

    public SentenceCategory? SentenceCategory { get; set; }
    public List<PhraseMeaning>? PhraseMeaning { get; set; } = new();
}