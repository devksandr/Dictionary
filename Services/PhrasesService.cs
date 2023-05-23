using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Database;
using System.Linq;
using System.Text.RegularExpressions;

namespace dict_react.Services;

public class PhrasesService : IPhrasesService
{
    private readonly ApplicationContext _db;
    private readonly IWebHostEnvironment _environment;

    public PhrasesService(ApplicationContext db, IWebHostEnvironment environment)
    {
        _db = db;
        _environment = environment;
    }

    public bool AddPhrase(AddPhraseModel phraseModel)
    {
        return true;
    }
}