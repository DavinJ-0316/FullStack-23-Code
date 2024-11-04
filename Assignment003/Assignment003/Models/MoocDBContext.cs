using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Assignment003.Models
{
    public class MoocDBContext : DbContext
    {
        public MoocDBContext(DbContextOptions<MoocDBContext> dbContext) : base(dbContext)
        { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(c =>
            {
                c.ToTable("User"); 
                c.HasKey(x => x.Id);
                c.Property(x => x.UserName).IsRequired().HasMaxLength(50);
                c.Property(x => x.Email).HasMaxLength(200);
                c.Property(x => x.Password).HasMaxLength(200);
                c.Property(x => x.Address).HasMaxLength(500);
                c.Property(x => x.Phone).HasMaxLength(50);
            });

            modelBuilder.Entity<Category>().ToTable("Categories");
            modelBuilder.Entity<Category>(c =>
            {
                c.HasKey(x => x.Id);
                c.Property(x => x.CategroyName).IsRequired().HasMaxLength(200);
                c.HasMany(x => x.Courses);
                //c.HasOne(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId);
            });

            modelBuilder.Entity<Course>().ToTable("Courses");
            modelBuilder.Entity<Course>(c =>
            {
                c.HasKey(x => x.Id);
                c.Property(x => x.CourseName).IsRequired().HasMaxLength(200);
                c.Property(x => x.Description).HasMaxLength(500);
                c.HasOne(x => x.Category);
            });
        }
    }
}
