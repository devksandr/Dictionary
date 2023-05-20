using dict_react.Models;
namespace dict_react.Models.Tables.Interfaces;

public interface ICategory
{
    public int Id { get; set; }
    public string? Name { get; set; }
}