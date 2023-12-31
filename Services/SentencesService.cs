using dict_react.Services.Interfaces;
using dict_react.Database;

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
}