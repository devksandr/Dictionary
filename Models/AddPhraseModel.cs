namespace dict_react.Models;

public class AddPhraseModel
{
    public int CategoryId { get; set; }
    public string? Phrase { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
    public int SentenceId { get; set; }
}