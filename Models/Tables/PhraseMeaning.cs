public class PhraseMeaning
{
    public int Id { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
    public int PhraseId { get; set; }

    public Phrase? Phrase { get; set; }
    public List<TagPhraseMeaning>? TagPhraseMeaning { get; set; } = new();
    public List<PhraseMeaningExample>? PhraseMeaningExample { get; set; } = new();
    public List<PhraseMeaningLexicon>? PhraseMeaningLexicon { get; set; } = new();
}