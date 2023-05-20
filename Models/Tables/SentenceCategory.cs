using dict_react.Models.Tables.Interfaces;
namespace dict_react.Models.Tables;

public class SentenceCategory : ICategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<Phrase>? Phrase { get; set; } = new();
}