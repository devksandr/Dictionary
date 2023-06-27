using dict_react.Models.Enum;
using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface ICategoriesService
{
    public IEnumerable<ICategory> GetCategories(Category category);
}