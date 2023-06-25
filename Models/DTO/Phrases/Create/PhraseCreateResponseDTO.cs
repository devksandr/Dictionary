using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class PhraseCreateResponseDTO
{
    public int PhraseId { get; set; }
    public int PhraseMeaningId { get; set; }
    public int SentenceNum { get; set; }
}