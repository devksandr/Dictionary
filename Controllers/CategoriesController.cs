using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
using dict_react.Models.Entity.Interfaces;
using dict_react.Models.Enum;

namespace dict_react.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    ICategoriesService _categoriesService;
    public CategoriesController(ICategoriesService categoriesService)
    {
        _categoriesService = categoriesService;
    }

   [HttpGet("{category}")]
    public IEnumerable<ICategory> GetCategories(Category category)
    {
        var categories = _categoriesService.GetCategories(category);
        return categories;
    }
}