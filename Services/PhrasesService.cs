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

    public List<SentenceDTO_Response_GetForFile> GetPhrasesForSentence(int fileId)
    {
        var sentences = _db.Sentences
            .Include(s => s.PhraseMeaningExample)
                .ThenInclude(pme => pme.PhraseMeaning)
                    .ThenInclude(pm => pm.Phrase)
            .Where(s => s.DocumentId == fileId && s.PhraseMeaningExample.Count > 0)
            .ToList();
        
        var sentencesDTO = new List<SentenceDTO_Response_GetForFile>();

        foreach (var sentence in sentences)
        {
            var PhraseMeaningExamplesDTO = new List<PhraseDTO_Response_GetForFile>();
            foreach (var PhraseMeaningExample in sentence.PhraseMeaningExample)
            {
                var PhraseMeaningExampleDTO = new PhraseDTO_Response_GetForFile()
                {
                    Id = PhraseMeaningExample.PhraseMeaning.PhraseId,
                    Data = PhraseMeaningExample.PhraseMeaning.Phrase.Data,
                    Comment = PhraseMeaningExample.PhraseMeaning.Comment
                };
                PhraseMeaningExamplesDTO.Add(PhraseMeaningExampleDTO);
            }
            var sentenceDTO = new SentenceDTO_Response_GetForFile()
            {
                Id = sentence.Id,
                SentenceNum = sentence.SentenceNum,
                Phrases = PhraseMeaningExamplesDTO
            };
            sentencesDTO.Add(sentenceDTO);
        }

        return sentencesDTO;
    }   

    public SentenceDTO_Response_GetForFile AddPhrase(AddPhraseModel phraseModel)
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

                var sentence = _db.Sentences.Find(phraseModel.SentenceId);
                var phraseDTO = new List<PhraseDTO_Response_GetForFile>() 
                { 
                    new PhraseDTO_Response_GetForFile() { Id = phrase.Id, Data = phraseModel.Phrase, Comment = phraseModel.Comment}
                };
                var sentenceDTO = new SentenceDTO_Response_GetForFile()
                {
                    Id = phraseModel.SentenceId,
                    SentenceNum = sentence.SentenceNum,
                    Phrases = phraseDTO
                };

                transaction.Commit();
                return sentenceDTO;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }
    }

    public bool DeletePhrase(int phraseId)
    {
        using(var transaction = _db.Database.BeginTransaction())
        {
            try
            {
                var phrase = _db.Phrases
                    .Include(p => p.PhraseMeaning)
                        .ThenInclude(pm => pm.PhraseMeaningExample)
                        .ThenInclude(pme => pme.Sentence)
                    .First(p => p.Id == phraseId);
                HashSet<Sentence> sentences = new HashSet<Sentence>();
                phrase.PhraseMeaning.ForEach(pm => pm.PhraseMeaningExample.ForEach(pme => sentences.Add(pme.Sentence)));
                foreach (var sentence in sentences.ToList())
                {
                    if (!_db.Documents.Any(d => d.Id == sentence.DocumentId))
                    {
                        _db.Sentences.Remove(sentence);
                    }
                }

                _db.Phrases.Remove(phrase);
                _db.SaveChanges();

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                return false;
            }
        }

        return true;
    }
}