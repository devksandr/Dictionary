using System.ComponentModel.DataAnnotations;
namespace dict_react.Models.DTO;

public class PhraseCreateRequestDTO
{
    public int SentenceId { get; set; }
    public int CategoryId { get; set; }
    [Required]
    [MinLength(3)]
    [MaxLength(128)]
    public string? Phrase { get; set; }
    [Required]
    [MaxLength(128)]
    public string? Meaning { get; set; }
    [MaxLength(255)]
    public string? Comment { get; set; }
}