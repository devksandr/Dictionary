using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Tables;
using dict_react.Models.DTO;
using dict_react.Database;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

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

    public IEnumerable<Phrase> GetPhrasesNames()
    {
        return _db.Phrases;
    }

    public PhraseDTO GetPhrase(int phraseId)
    {
        var phrase = _db.Phrases
            .Include(p => p.SentenceCategory)
            .Include(p => p.PhraseMeaning)
            .FirstOrDefault(p => p.Id == phraseId);
        var sentenceCategory = _db.SentenceCategories.Find(phrase.SentenceCategoryId);

        var phraseDTO = new PhraseDTO
        {
            Id = phrase.Id,
            Data = phrase.Data,
            SentenceCategory = sentenceCategory.Name
        };
        foreach (var pm in phrase.PhraseMeaning)
        {
            var phraseMeaningDTO = new PhraseMeaningDTO
            {
                Id = pm.Id,
                Meaning = pm.Meaning,
                Comment = pm.Comment
            };
            phraseDTO.PhraseMeanings.Add(phraseMeaningDTO);
        }

        return phraseDTO;
    }

    public bool AddPhrase(AddPhraseModel phraseModel)
    {
        using(var transaction = _db.Database.BeginTransaction())
        {
            try
            {
                var phrase = new Phrase { Data = phraseModel.Phrase, SentenceCategoryId = phraseModel.Category };
                _db.Phrases.Add(phrase);
                _db.SaveChanges();
                var phraseMeaning = new PhraseMeaning { Meaning = phraseModel.Meaning, Comment = phraseModel.Comment, PhraseId = phrase.Id };
                _db.PhraseMeanings.Add(phraseMeaning);
                _db.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return false;
            }
        }

        return true;
    }

    public bool DeletePhrase(int phraseId)
    {
        try
        {
            var phrase = new Phrase { Id = phraseId };
            _db.Phrases.Remove(phrase);
            _db.SaveChanges();
        }
        catch
        {
            return false;
        }

        return true;
    }
}