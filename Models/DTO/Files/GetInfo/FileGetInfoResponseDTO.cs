using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class FileGetInfoResponseDTO
{
    public int FileId { get; set; }
    public string? Name { get; set; }
}