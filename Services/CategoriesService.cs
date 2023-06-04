using dict_react.Services.Interfaces;
using dict_react.Database;
using dict_react.Models.Entity.Interfaces;
using dict_react.Models.Enum;

namespace dict_react.Services;

public class CategoriesService : ICategoriesService
{
    private readonly ApplicationContext _db;
    private readonly IWebHostEnvironment _environment;

    public CategoriesService(ApplicationContext db, IWebHostEnvironment environment)
    {
        _db = db;
        _environment = environment;
    }

    public IEnumerable<ICategory> GetCategories(Category category)
    {
        return category switch
        {
            Category.SentenceCategory => _db.SentenceCategories,
            Category.PhraseMeaningCategory => _db.PhraseMeaningCategories
        };
    }
}