namespace dict_react.Models.Tables;

public class Sentence
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public int SentenceNum { get; set; }
    public string? Data { get; set; }

    public Document? Document { get; set; }
    public List<PhraseMeaningExample>? PhraseMeaningExample { get; set; } = new();
}