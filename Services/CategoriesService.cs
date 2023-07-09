using dict_react.Services.Interfaces;
using dict_react.Database;
using dict_react.Models.Enum;
using dict_react.Models.DTO;

namespace dict_react.Services;

public class CategoriesService : ICategoriesService
{
    private readonly ApplicationContext _db;

    public CategoriesService(ApplicationContext db)
    {
        _db = db;
    }

    public IEnumerable<ICategory>? GetCategories(Category category)
    {
        try
        {
            return category switch
            {
                Category.SentenceCategory => _db.SentenceCategories,
                Category.PhraseMeaningCategory => _db.PhraseMeaningCategories,
                _ => throw new Exception("Wrong category")
            };
        }
        catch (Exception)
        {
            return null;
        }
    }
}