using dict_react.Models;
using dict_react.Models.Tables.Interfaces;

namespace dict_react.Services.Interfaces;

public interface ICategoriesService
{
    public IEnumerable<ICategory> GetCategories(Category category);
}