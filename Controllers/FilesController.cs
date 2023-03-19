using Microsoft.AspNetCore.Mvc;

namespace aspreact.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    ApplicationContext _db;
    public FilesController(ApplicationContext db)
    {
        _db = db;
    }

    [HttpGet]
    public IEnumerable<string?> GetFilesNames()
    {
        var fileNames = _db.Documents
            .Select(d => d.Name)
            .ToList();
        return fileNames;
    }

    [HttpPost]
    public ActionResult AddFiles([FromBody] File file)
    {
        /*
        if(file is null) return BadRequest();

        string dir = "wwwroot/documents/";
        List<string> text = new();
        text.Add(file.Text);
        System.IO.File.WriteAllLines(dir + file.Name, text);
        Document document = new Document { Name = file.Name };
        _db.Documents.Add(document);
        await _db.SaveChangesAsync();
        return Ok(file);
        */

        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.Name);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.FormFile.CopyTo(stream);
            }

            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}