using dict_react.Models.Tables.Interfaces;
namespace dict_react.Models.Tables;
public class PhraseMeaningCategory : ICategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<PhraseMeaningLexicon>? PhraseMeaningLexicon { get; set; } = new();
}