namespace dict_react.Models.DTO;

public class SentenceDTO_Response_GetForFile
{
    public int Id { get; set; }
    public int SentenceNum { get; set; }
    public List<PhraseDTO_Response_GetForFile>? Phrases { get; set; }
}