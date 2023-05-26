using System.Text;
using Microsoft.AspNetCore.Http;
using dict_react.Models.Tables;

namespace dict_react.Models;

public class AddPhraseModel
{
    public int Category { get; set; }
    public string? Phrase { get; set; }
    public string? Meaning { get; set; }
    public string? Comment { get; set; }

}