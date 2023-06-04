namespace dict_react.Models.Entity;

public class Document
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<Sentence>? Sentence { get; set; } = new();
}