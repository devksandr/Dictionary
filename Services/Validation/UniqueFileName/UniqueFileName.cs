using System.ComponentModel.DataAnnotations;
using dict_react.Database;

namespace dict_react.Services.Validation;

public class UniqueFileName
{
    private readonly ApplicationContext _db;

    public UniqueFileName(ApplicationContext db)
    {
        _db = db;
    }

    public ValidationResult Validate(object value, ValidationContext validationContext)
    {
        var files = (List<IFormFile>)value;
        var fileNames = files.Select(f => f.FileName).ToList();
        bool hasDuplicate = _db.Documents.Any(d => fileNames.Contains(d.Name));
        if (hasDuplicate)
        {
            return new ValidationResult($"Добавляемые файлы содержат существующие дублирующие имена", new string[] { "Duplicate" });
        }

        return ValidationResult.Success;
    }
}