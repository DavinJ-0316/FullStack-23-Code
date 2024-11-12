using EFCoreModelFirst_5.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EFCoreModelFirst_5
{
    public class SchoolContext : DbContext
    {
				//data source=ZSYD1WSOF18\\SQLEXPRESS;initial catalog=SchoolDB;persist security info=True;user id=sa;password=Changed2;encrypt=True;trustservercertificate=True;MultipleActiveResultSets=True;App=EntityFramework
				private readonly string connectionString = "Data Source=DESKTOP-11BV3GV;Initial Catalog=SchoolDB;Integrated Security=True;Encrypt=True;MultipleActiveResultSets=True;Trust Server Certificate=True";
        //entities
        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .LogTo(Console.WriteLine)
                .UseLazyLoadingProxies(true)
                .UseSqlServer(connectionString);						

				}
    }
}
