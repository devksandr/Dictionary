public class PhraseMeaningExample
{
    public int Id { get; set; }
    public int PhraseMeaningId { get; set; }
    public int SentenceId { get; set; }

    public Sentence? Sentence { get; set; }
    public PhraseMeaning? PhraseMeaning { get; set; }
}