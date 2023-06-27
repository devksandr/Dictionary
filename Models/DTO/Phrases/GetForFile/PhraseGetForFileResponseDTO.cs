namespace dict_react.Models.DTO;

public class PhraseGetForFileResponseDTO
{
    public int PhraseId { get; set; }
    public int PhraseMeaningId { get; set; }
    public int CategoryId { get; set; }
    public string? Data { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
}