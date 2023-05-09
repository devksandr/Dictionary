using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Database;
using System.Linq;

namespace dict_react.Services;

public class SentencesService : ISentencesService
{
    private readonly ApplicationContext _db;
    private readonly IWebHostEnvironment _environment;

    public SentencesService(ApplicationContext db, IWebHostEnvironment environment)
    {
        _db = db;
        _environment = environment;
    }

    public IEnumerable<string> GetSentences(string fileName)
    {
        var wwwroot = _environment.WebRootPath;
        var filePath = Path.Combine(wwwroot, fileName);
        var text = File.ReadAllText(filePath);
        var sentences = SplitText(text);
        return sentences;
    }

    IEnumerable<string> SplitText(string text)
    {
        // TODO algorythm
        return new List<string>() { text };
    }
}