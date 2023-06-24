namespace dict_react.Models.DTO;

public class PhraseDTO_Response_GetForFile
{
    public int Id { get; set; }
    public int PhraseMeaningId { get; set; }
    public int CategoryId { get; set; }
    public string? Data { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
}