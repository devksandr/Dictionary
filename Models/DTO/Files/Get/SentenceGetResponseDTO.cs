using Microsoft.AspNetCore.Mvc;
namespace dict_react.Models.DTO;

public class SentenceGetResponseDTO
{
    public int SentenceId { get; set; }
    public int SentenceNum { get; set; }
    public string? Data { get; set; }
}