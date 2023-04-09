namespace dict_react.Models.Tables;

public class PhraseMeaningCategory
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public List<PhraseMeaningLexicon>? PhraseMeaningLexicon { get; set; } = new();
}