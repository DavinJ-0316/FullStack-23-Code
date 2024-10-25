using Org.BouncyCastle.Asn1.Mozilla;

namespace WebAPITest.Models
{
    public class RolePermission : BaseModel
    {
        public int RoleId { get; set; }

        public Role Role { get; set; }
        public int PermissionId { get; set; }

        public Permission Permission { get; set; }
    }
}
