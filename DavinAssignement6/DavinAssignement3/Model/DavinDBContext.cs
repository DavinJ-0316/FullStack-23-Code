using Microsoft.EntityFrameworkCore;
using DavinAssignment3.Model;

namespace DavinAssignement3.Model
{
    public class DavinDBContext : DbContext
    {
        public DavinDBContext(DbContextOptions<DavinDBContext> options) : base(options) 
        {

        }
       /* public DbSet<User> User { get; set; }*/

        public DbSet<Category> Category { get; set; }

        public DbSet<Course> Course { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // forget ORM: User table I created manually in local, because users table already exist when coding ADO.Net

/*          modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<User>(c =>
            {
                c.HasKey(x => x.Id);
                c.Property(x => x.Email).IsRequired().HasMaxLength(200);
            });*/

            modelBuilder.Entity<Category>().ToTable("Categories");
            modelBuilder.Entity<Category>(c => 
            { 
                c.HasKey(x => x.Id);
                c.Property(x => x.CategoryName).IsRequired().HasMaxLength(200);
                c.HasMany(x => x.Courses); // without HasMany, Courses will be treated as a field in DB
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
