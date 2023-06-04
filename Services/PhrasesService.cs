using dict_react.Services.Interfaces;
using dict_react.Models;
using dict_react.Models.Entity;
using dict_react.Models.DTO;
using dict_react.Database;
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
                .ThenInclude(pm => pm.PhraseMeaningExample)
                    .ThenInclude(pme => pme.Sentence)
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
            var phraseMeaningExamplesDTO = new List<PhraseMeaningExampleDTO>();
            foreach (var pme in pm.PhraseMeaningExample)
            {
                var phraseMeaningExampleDTO = new PhraseMeaningExampleDTO
                {
                    Id = pme.Id,
                    Sentence = pme.Sentence.Data
                };
                phraseMeaningExamplesDTO.Add(phraseMeaningExampleDTO);
            }
            var phraseMeaningDTO = new PhraseMeaningDTO
            {
                Id = pm.Id,
                Meaning = pm.Meaning,
                Comment = pm.Comment,
                PhraseMeaningExamples = phraseMeaningExamplesDTO
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
                var phrase = new Phrase { Data = phraseModel.Phrase, SentenceCategoryId = phraseModel.CategoryId };
                _db.Phrases.Add(phrase);
                _db.SaveChanges();

                var phraseMeaning = new PhraseMeaning { Meaning = phraseModel.Meaning, Comment = phraseModel.Comment, PhraseId = phrase.Id };
                _db.PhraseMeanings.Add(phraseMeaning);
                _db.SaveChanges();

                var phraseMeaningExample = new PhraseMeaningExample { PhraseMeaningId = phraseMeaning.Id, SentenceId = phraseModel.SentenceId };
                _db.PhraseMeaningExamples.Add(phraseMeaningExample);
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