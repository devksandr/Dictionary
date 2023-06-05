namespace dict_react.Models.Entity;

public class Sentence
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public int SentenceNum { get; set; }
    public string? Data { get; set; }

    public List<PhraseMeaningExample>? PhraseMeaningExample { get; set; } = new();
}