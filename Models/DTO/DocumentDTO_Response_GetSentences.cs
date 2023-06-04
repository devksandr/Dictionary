using System.Text;
using Microsoft.AspNetCore.Http;

namespace dict_react.Models.DTO;

public class DocumentDTO_Response_GetSentences
{
    public string? Name { get; set; }
    public IEnumerable<string>? Sentences { get; set; }
}