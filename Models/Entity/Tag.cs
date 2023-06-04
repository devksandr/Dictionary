namespace dict_react.Models.Entity;

public class Tag
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<TagPhraseMeaning>? TagPhraseMeaning { get; set; } = new();
}