using System.ComponentModel.DataAnnotations;

namespace WebAPITest.ViewModel
{
    /// <summary>
    /// LoginInput
    /// </summary>
    public class LoginInput
    {
        [Required(ErrorMessage = "username is not null")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is not null")]
        public string Password { get; set; }


    }
}
