using dict_react.Models.DTO;
namespace dict_react.Models.Entity;

public class PhraseMeaningCategory : ICategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<PhraseMeaningLexicon>? PhraseMeaningLexicon { get; set; } = new();
}