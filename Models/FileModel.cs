using System.Text;
using Microsoft.AspNetCore.Http;

namespace dict_react.Models;

public class FileModel
{
    public string? Name { get; set; }
    public IFormFile? FormFile { get; set; }
}