namespace dict_react.Models.Tables;

public class PhraseMeaningLexicon
{
    public int Id { get; set; }
    public int PhraseMeaningId { get; set; }
    public int PhraseMeaningLexiconId { get; set; }
    public int PhraseMeaningCategoryId { get; set; }

    public PhraseMeaningCategory? PhraseMeaningCategory { get; set; }
    public PhraseMeaning? PhraseMeaning { get; set; }
}