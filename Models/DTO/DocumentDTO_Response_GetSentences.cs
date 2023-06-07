namespace dict_react.Models.DTO;

public class DocumentDTO_Response_GetSentences
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public IEnumerable<SentenceDTO>? Sentences { get; set; }
}