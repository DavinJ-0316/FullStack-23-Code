namespace WebAPITest.Models
{
    public class Role : BaseModel
    {
        public string RoleName { get; set; }

        public virtual ICollection<UserRoles> UserRoles { get; set; } = new List<UserRoles>();
        public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
