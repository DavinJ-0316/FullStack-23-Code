namespace WebAPITest.Models
{
    public class Permission : BaseModel
    {

        public string Title { get; set; }

        public string PermissionCode { get; set; }


        public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

        
    }
}
