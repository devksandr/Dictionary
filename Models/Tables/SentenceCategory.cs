namespace dict_react.Models.Tables;

public class SentenceCategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<Phrase>? Phrase { get; set; } = new();
}