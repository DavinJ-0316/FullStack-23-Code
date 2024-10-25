using Assignment003.Enum;
using Assignment003.Models;

namespace Assignment003.ViewModels
{
    public class UserOutput : BaseModel
    {
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }

        public Gender Gender { get; set; }
        public string? Phone { get; set; }

    }
}
