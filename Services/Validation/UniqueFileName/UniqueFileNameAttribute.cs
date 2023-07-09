using System.ComponentModel.DataAnnotations;

namespace dict_react.Services.Validation;

public class UniqueFileNameAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
        {
            return new ValidationResult("Параметр атрибута = null");
        }

        var uniqueFileNameObjectService = validationContext.GetService(typeof(UniqueFileName));
        if (uniqueFileNameObjectService is null)
        {
            return new ValidationResult("Ошибка при получении сервиса: UniqueFileName (1)");
        }

        var uniqueFileNameService = (UniqueFileName)uniqueFileNameObjectService;
        if (uniqueFileNameService is null)
        {
            return new ValidationResult("Ошибка при получении сервиса: UniqueFileName (2)");
        }
        return uniqueFileNameService.Validate(value, validationContext);
    }
}