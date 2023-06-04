using System.Text;
using Microsoft.AspNetCore.Http;

namespace dict_react.Models.DTO;

public class DocumentDTO_Request_AddText
{
    public List<IFormFile>? FormFiles { get; set; }
}