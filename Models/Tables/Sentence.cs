using System.ComponentModel.DataAnnotations.Schema;

public class Sentence
{
    public int Id { get; set; }
    public int DocumentId { get; set; }
    public int SentenceNum { get; set; }
    [NotMapped]
    public string? Data { get; set; }

    public Document? Document { get; set; }
    public List<PhraseMeaningExample>? PhraseMeaningExample { get; set; } = new();
}