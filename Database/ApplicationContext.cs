using Microsoft.EntityFrameworkCore;
 
public class ApplicationContext : DbContext
{
    public DbSet<Document> Documents { get; set; } = null!;
    public DbSet<Phrase> Phrases { get; set; } = null!;
    public DbSet<PhraseMeaning> PhraseMeanings { get; set; } = null!;
    public DbSet<PhraseMeaningCategory> PhraseMeaningCategories { get; set; } = null!;
    public DbSet<PhraseMeaningExample> PhraseMeaningExamples { get; set; } = null!;
    public DbSet<PhraseMeaningLexicon> PhraseMeaningLexicons { get; set; } = null!;
    public DbSet<Sentence> Sentences { get; set; } = null!;
    public DbSet<SentenceCategory> SentenceCategories { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;
    public DbSet<TagPhraseMeaning> TagPhraseMeanings { get; set; } = null!;

    string dbPath = null!;
    string dbName = null!;

    public ApplicationContext()
    {
        dbName = "dictionary.db";
        dbPath = System.IO.Path.Join("Database", dbName);

        Database.EnsureCreated();
    }
 
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite($"Data Source={dbPath}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SentenceCategory>().HasData(
            new SentenceCategory { Id = 1, Name = "Unsorted" },
            new SentenceCategory { Id = 2, Name = "Phrasal verbs" },
            new SentenceCategory { Id = 3, Name = "Verbs" },
            new SentenceCategory { Id = 4, Name = "Words" },
            new SentenceCategory { Id = 5, Name = "Phrases" },
            new SentenceCategory { Id = 6, Name = "Idioms" }
        );

        modelBuilder.Entity<Tag>().HasData(
            new Tag { Id = 1, Name = "?" },
            new Tag { Id = 2, Name = "Rule" }
        );

        modelBuilder.Entity<PhraseMeaningCategory>().HasData(
            new PhraseMeaningCategory { Id = 1, Name = "Synonyms" },
            new PhraseMeaningCategory { Id = 2, Name = "Antonyms" }
        );
    }
}