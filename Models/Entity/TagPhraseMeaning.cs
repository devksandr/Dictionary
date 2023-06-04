namespace dict_react.Models.Entity;

public class TagPhraseMeaning
{
    public int Id { get; set; }
    public int TagId { get; set; }
    public int PhraseMeaningId { get; set; }

    public Tag? Tag { get; set; }
    public PhraseMeaning? PhraseMeaning { get; set; }
}