using dict_react.Models.Entity.Interfaces;
using dict_react.Models.Enum;

namespace dict_react.Services.Interfaces;

public interface ICategoriesService
{
    public IEnumerable<ICategory> GetCategories(Category category);
}