using Microsoft.EntityFrameworkCore;
using MoocApi.Models;

namespace WebAPITest.Models
{
    public class MoocDBContext : DbContext
    {
        public MoocDBContext(DbContextOptions<MoocDBContext> options) : base(options)
        {

        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Course> Course { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
