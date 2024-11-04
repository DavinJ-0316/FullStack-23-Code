using DavinAssignement3.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DavinAssignement3.Utility
{
    public class Utility
    {
        public static JsonResult CustomValidation<T>(T? entity, NotFoundObjectResult notfound, Func<bool> sqlOperation, bool isvalid = true)
        {
            if (entity == null)
            {
                CommonResult<T> notFoundResult = new CommonResult<T>
                {
                    IsSuccess = false,
                    Message = "Can not find target result, please try again",
                    Data = { },
                    Error = notfound,
                };
                return new JsonResult(notFoundResult);
            }

            if (isvalid)
            {
                var validationResults = new List<ValidationResult>();
                var validationContext = new ValidationContext(entity, null, null);
                bool isValid = Validator.TryValidateObject(entity, validationContext, validationResults, true);

                if (!isValid)
                {
                    CommonResult<T> onValidationFailResult = new CommonResult<T>
                    {
                        IsSuccess = false,
                        Message = "Validation Failed, please correct your input and try again",
                        Data = { },
                        Error = validationResults,
                    };
                    return new JsonResult(onValidationFailResult);
                }
            }

            if (sqlOperation != null)
            {
                var isSuccess = sqlOperation();
                if (!isSuccess)
                {
                    CommonResult<T> onFailedSQLOperation = new CommonResult<T>
                    {
                        IsSuccess = false,
                        Message = "sql operation failed",
                        Error = "sql operation failed",
                        Data = { },
                    };

                    return new JsonResult(onFailedSQLOperation);
                }
            }

            CommonResult<T> Result = new CommonResult<T>
            {
                IsSuccess = true,
                Message = "sql operation succeed",
                Error = { },
                Data = entity,
            };

            return new JsonResult(Result);
        }


        public static JsonResult CustomValidationForList<T>(List<T>? entities, NotFoundObjectResult notfound)
        {
            if (entities == null || entities.Count == 0)
            {
                CommonResult<T> notFoundResult = new CommonResult<T>
                {
                    IsSuccess = false,
                    Message = "Can not find target result, please try again",
                    Data = { },
                    Error = notfound,
                };
                return new JsonResult(notFoundResult);
            }

            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(entities, null, null);
            bool isValid = Validator.TryValidateObject(entities, validationContext, validationResults, true);

            if (!isValid)
            {
                CommonResult<T> onValidationFailResult = new CommonResult<T>
                {
                    IsSuccess = false,
                    Message = "Validation Failed, please correct your input and try again",
                    Data = { },
                    Error = validationResults,
                };
                return new JsonResult(onValidationFailResult);
            }

            CommonResult<List<T>> result = new CommonResult<List<T>>
            {
                IsSuccess = true,
                Message = "",
                Error = { },
                Data = entities,
            };

            return new JsonResult(result);
        }
    }
}
