namespace dict_react.Models.DTO;

public class SentenceGetForFileResponseDTO
{
    public int SentenceId { get; set; }
    public int SentenceNum { get; set; }
    public List<PhraseGetForFileResponseDTO>? Phrases { get; set; }
}