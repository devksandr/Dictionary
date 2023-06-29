using System.ComponentModel.DataAnnotations;
namespace dict_react.Models.DTO;

public class PhraseUpdateRequestDTO
{
    public int PhraseId { get; set; }
    public int PhraseMeaningId { get; set; }
    public int CategoryId { get; set; }
    [MinLength(3)]
    [Required]
    public string? Phrase { get; set; }
    [Required]
    public string? Meaning { get; set; }
    public string? Comment { get; set; }
}