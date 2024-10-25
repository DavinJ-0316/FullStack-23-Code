namespace WebAPITest.Models
{
    public class UserRoles:BaseModel
    {
        public  int UserId { get; set; } 

        public UserEF User { get; set; }

        public  Role Role { get; set; } 

        public int RoleId { get; set; } 
    }
}
