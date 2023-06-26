using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class FileCreateResponseDTO
{
    public int FileId { get; set; }
    public string? Name { get; set; }
}