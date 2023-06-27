using dict_react.Models.DTO;

namespace dict_react.Models.Entity;

public class SentenceCategory : ICategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<Phrase>? Phrase { get; set; } = new();
}