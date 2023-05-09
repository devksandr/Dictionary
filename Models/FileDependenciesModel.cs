using System.Text;
using Microsoft.AspNetCore.Http;

namespace dict_react.Models;

public class FileDependenciesModel
{
    public string? Name { get; set; }
    public IEnumerable<string> Sentences { get; set; }
}