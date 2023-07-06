using System.ComponentModel.DataAnnotations;

namespace dict_react.Services.Validation;

public class UniqueFileNameAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var uniqueFileName = (UniqueFileName)validationContext.GetService(typeof(UniqueFileName));
        return uniqueFileName.Validate(value, validationContext);
    }
}