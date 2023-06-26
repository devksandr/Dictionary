using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class FileCreateRequestDTO
{
    public List<IFormFile>? FormFiles { get; set; }
}