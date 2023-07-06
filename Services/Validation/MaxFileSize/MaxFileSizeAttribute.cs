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

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var files = (List<IFormFile>)value;
        var fileMaxSize = files.Max(f => f.Length);
        if (fileMaxSize > _maxAllowedSize)
        {
            return new ValidationResult($"Добавляемые файлы содержат существующие дублирующие имена", new string[] { "MaxSize" });
        }

        return ValidationResult.Success;
    }
}