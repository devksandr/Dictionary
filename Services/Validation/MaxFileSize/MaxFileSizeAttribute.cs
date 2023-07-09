using System.ComponentModel.DataAnnotations;
using dict_react.Database;

namespace dict_react.Services.Validation;

public class MaxFileSizeAttribute : ValidationAttribute
{
    int _maxAllowedSize;

    public MaxFileSizeAttribute(int maxAllowedSize)
    {
        _maxAllowedSize = maxAllowedSize;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
        {
            return new ValidationResult("Параметр атрибута = null");
        }
        
        var files = (List<IFormFile>)value;
        var fileMaxSize = files.Max(f => f.Length);

        if (fileMaxSize > _maxAllowedSize)
        {
            return new ValidationResult($"Добавляемые файлы превышают максимальный размер", new string[] { "MaxSize" });
        }

        return ValidationResult.Success;
    }
}