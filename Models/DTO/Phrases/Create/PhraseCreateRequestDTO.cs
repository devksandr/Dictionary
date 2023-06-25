using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class PhraseCreateRequestDTO
{
    public int SentenceId { get; set; }
    public int CategoryId { get; set; }
    public string? Phrase { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
}