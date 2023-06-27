using dict_react.Services.Interfaces;
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

    public PhraseCreateResponseDTO AddPhrase(PhraseCreateRequestDTO phraseModel)
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
                
                var phraseDTO = new PhraseCreateResponseDTO()
                {
                    PhraseId = phrase.Id,
                    PhraseMeaningId = phraseMeaning.Id,
                    SentenceNum = sentence.SentenceNum
                };

                transaction.Commit();
                return phraseDTO;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
            }
        }
    }

    public PhraseGetResponseDTO GetPhrase(int phraseId)
    {
        try
        {
            var phrase = _db.Phrases
                .Include(p => p.SentenceCategory)
                .Include(p => p.PhraseMeaning)
                    .ThenInclude(pm => pm.PhraseMeaningExample)
                        .ThenInclude(pme => pme.Sentence)
                .FirstOrDefault(p => p.Id == phraseId);
            var sentenceCategory = _db.SentenceCategories.Find(phrase.SentenceCategoryId);

            var phraseDTO = new PhraseGetResponseDTO
            {
                PhraseId = phrase.Id,
                Data = phrase.Data,
                SentenceCategory = sentenceCategory.Name
            };
            foreach (var pm in phrase.PhraseMeaning)
            {
                var phraseMeaningExamplesDTO = new List<PhraseMeaningExampleGetResponseDTO>();
                foreach (var pme in pm.PhraseMeaningExample)
                {
                    var phraseMeaningExampleDTO = new PhraseMeaningExampleGetResponseDTO
                    {
                        PhraseMeaningExampleId = pme.Id,
                        Sentence = pme.Sentence.Data
                    };
                    phraseMeaningExamplesDTO.Add(phraseMeaningExampleDTO);
                }
                var phraseMeaningDTO = new PhraseMeaningGetResponseDTO
                {
                    PhraseMeaningId = pm.Id,
                    Meaning = pm.Meaning,
                    Comment = pm.Comment,
                    PhraseMeaningExamples = phraseMeaningExamplesDTO
                };
                phraseDTO.PhraseMeanings.Add(phraseMeaningDTO);
            }

            return phraseDTO;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public IEnumerable<PhraseGetInfoResponseDTO> GetAllPhrasesInfo()
    {
        try
        {
            var phrasesDTO = new List<PhraseGetInfoResponseDTO>();
            var phrases = _db.Phrases;
            foreach (var phrase in phrases)
            {
                PhraseGetInfoResponseDTO phraseDTO = new PhraseGetInfoResponseDTO 
                { 
                    PhraseId = phrase.Id, 
                    Data = phrase.Data 
                };
                phrasesDTO.Add(phraseDTO);
            } 
            return phrasesDTO;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public IEnumerable<SentenceGetForFileResponseDTO> GetAllPhrasesForFile(int fileId)
    {
        try
        {
            var sentences = _db.Sentences
                .Include(s => s.PhraseMeaningExample)
                    .ThenInclude(pme => pme.PhraseMeaning)
                        .ThenInclude(pm => pm.Phrase)
                .Where(s => s.DocumentId == fileId && s.PhraseMeaningExample.Count > 0)
                .ToList();
            
            var sentencesDTO = new List<SentenceGetForFileResponseDTO>();

            foreach (var sentence in sentences)
            {
                var PhrasesDTO = new List<PhraseGetForFileResponseDTO>();
                foreach (var PhraseMeaningExample in sentence.PhraseMeaningExample)
                {
                    var PhraseDTO = new PhraseGetForFileResponseDTO()
                    {
                        PhraseId = PhraseMeaningExample.PhraseMeaning.PhraseId,
                        PhraseMeaningId = PhraseMeaningExample.PhraseMeaning.Id,
                        CategoryId = PhraseMeaningExample.PhraseMeaning.Phrase.SentenceCategoryId,
                        Data = PhraseMeaningExample.PhraseMeaning.Phrase.Data,
                        Meaning = PhraseMeaningExample.PhraseMeaning.Meaning,
                        Comment = PhraseMeaningExample.PhraseMeaning.Comment
                    };
                    PhrasesDTO.Add(PhraseDTO);
                }
                var sentenceDTO = new SentenceGetForFileResponseDTO()
                {
                    SentenceId = sentence.Id,
                    SentenceNum = sentence.SentenceNum,
                    Phrases = PhrasesDTO
                };
                sentencesDTO.Add(sentenceDTO);
            }

            return sentencesDTO;
        }
        catch (Exception ex)
        {
            return null;
        }
    }   

    public bool UpdatePhrase(PhraseUpdateRequestDTO phraseModel)
    {
        using(var transaction = _db.Database.BeginTransaction())
        {
            try
            {
                var phrase = _db.Phrases.Find(phraseModel.PhraseId);
                var sentenceCategory = _db.SentenceCategories.Find(phraseModel.CategoryId);
                phrase.Data = phraseModel.Phrase;
                phrase.SentenceCategory = sentenceCategory;
                
                var phraseMeaning = _db.PhraseMeanings.Find(phraseModel.PhraseMeaningId);
                phraseMeaning.Meaning = phraseModel.Meaning;
                phraseMeaning.Comment = phraseModel.Comment;

                _db.SaveChanges();
                transaction.Commit();

                return true;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return false;
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