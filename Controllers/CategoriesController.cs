using Microsoft.AspNetCore.Mvc;
using dict_react.Services.Interfaces;
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
    public ActionResult GetCategories(Category category)
    {
        var result = _categoriesService.GetCategories(category);
        if (result is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        return Ok(result);
    }
}