using Microsoft.AspNetCore.Http;

namespace dict_react.Models;

public class File
{
    public string? Name { get; set; }
    public IFormFile? FormFile { get; set; }
}