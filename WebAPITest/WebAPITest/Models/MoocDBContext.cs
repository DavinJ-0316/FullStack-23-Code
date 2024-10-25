using Microsoft.EntityFrameworkCore;

namespace WebAPITest.Models
{
    public class MoocDBContext : DbContext
    {
        public MoocDBContext(DbContextOptions<MoocDBContext> options) : base(options)
        {

        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Course> Course { get; set; }
        public DbSet<UserEF> UserEF { get; set; }

        public DbSet<Role> Role { get; set; }

        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Permission> Permission { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEF>().ToTable("User");


            modelBuilder.Entity<Role>(b =>
            {
                b.ToTable("Roles");
                b.HasKey(x => x.Id);
                b.Property(x => x.RoleName).IsRequired().HasMaxLength(200);
                b.HasMany(x => x.UserRoles);
                b.HasMany(x => x.RolePermissions);
            });

            modelBuilder.Entity<Permission>(b =>
            {
                b.ToTable("Permissions");
                b.HasKey(x => x.Id);
                b.Property(x => x.PermissionCode).IsRequired().HasMaxLength(200);
                b.HasMany(b => b.RolePermissions);
            });

            modelBuilder.Entity<RolePermission>(b =>
            {
                b.ToTable("RolePermission");
                b.HasKey(x => x.Id);
            });

            modelBuilder.Entity<UserRoles>(b =>
            {
                b.ToTable("UserRole");
                b.HasKey(x => x.Id);
            });

            modelBuilder.Entity<Category>().ToTable("Categorys");
            modelBuilder.Entity<Category>(c =>
            {
                c.HasKey(x => x.Id);
                c.Property(x => x.CategroyName).IsRequired().HasMaxLength(200);
                c.HasMany(x => x.Courses);
            });

            modelBuilder.Entity<Course>().ToTable("Courses");
            modelBuilder.Entity<Course>(c =>
            {
                c.HasKey(x => x.Id);
                c.Property(x => x.CourseName).IsRequired().HasMaxLength(200);
                c.Property(x => x.Description).IsRequired().HasMaxLength(200);
                c.HasOne(x => x.Category);
            });
        }

    }
}
