namespace dict_react.Models.DTO;

public class PhraseMeaningGetResponseDTO
{
    public int PhraseMeaningId { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }

    public List<PhraseMeaningExampleGetResponseDTO>? PhraseMeaningExamples { get; set; } = new();
}