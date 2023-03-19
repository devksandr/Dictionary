using Microsoft.AspNetCore.Http;
public class File
{
    public string? Name { get; set; }
    public IFormFile? FormFile { get; set; }
}