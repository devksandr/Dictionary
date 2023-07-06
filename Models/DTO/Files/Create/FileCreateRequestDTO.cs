using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Validation;
namespace dict_react.Models.DTO;


public class FileCreateRequestDTO
{
    [UniqueFileName]
    [MaxFileSize(52428800)]
    [MaxFileNameLength(50)]
    public List<IFormFile>? FormFiles { get; set; }
}