using System.ComponentModel.DataAnnotations;
using dict_react.Database;

namespace dict_react.Services.Validation;

public class MaxFileNameLength : ValidationAttribute
{
    int _maxAllowedNameLength;

    public MaxFileNameLength(int maxAllowedNameLength)
    {
        _maxAllowedNameLength = maxAllowedNameLength;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
        {
            return new ValidationResult("Параметр атрибута = null");
        }

        var files = (List<IFormFile>)value;
        var fileMaxNameLength = files.Max(f => f.FileName.Length);

        if (fileMaxNameLength > _maxAllowedNameLength)
        {
            return new ValidationResult($"Добавляемые файлы превышают максимальную длину имени", new string[] { "MaxName" });
        }
  
        return ValidationResult.Success;
    }
}