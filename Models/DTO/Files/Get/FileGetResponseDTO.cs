using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class FileGetResponseDTO
{
    public int FileId { get; set; }
    public string? Name { get; set; }

    public IEnumerable<SentenceGetResponseDTO>? Sentences { get; set; }
}