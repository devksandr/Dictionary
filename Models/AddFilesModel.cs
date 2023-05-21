using System.Text;
using Microsoft.AspNetCore.Http;

namespace dict_react.Models;

public class AddFilesModel
{
    public List<IFormFile>? FormFiles { get; set; }
}