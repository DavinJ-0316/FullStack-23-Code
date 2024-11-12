using EFCoreModelFirst_5.Models;
using Microsoft.EntityFrameworkCore;

namespace EFCoreModelFirst_5
{
    internal class Program
    {
        //https://learn.microsoft.com/en-us/ef/core/querying/related-data/
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            using (SchoolContext schoolContext = new SchoolContext())
            {                                
                try
                {
                    #region Lazy loading without proxy - steps
                    //1. disable the UseLazyLoadingProxies - pass the false or remove it in the DbContext
                    //2. Inject the ILazyLoader service in Entity (Grade) to tell it how to load the navigation students
                    //foreach (var grade in schoolContext.Grades)
                    //{
                    //    Console.WriteLine($"{grade.GradeName} {grade.GradeId}");
                    //}

                    //IEnumerable
                    //IQueryable<Grade> querable = schoolContext.Grades.Where(x => x.GradeName == "Grade2");
                    //deferred execution
                    //select * from Grades where GradeName == 'Test'                                

                    //foreach(var grade in querable)
                    //{
                    //    Console.WriteLine($"{grade.GradeName}");
                    //}
                    //foreach (var grade in schoolContext.Grades)
                    //{
                    //    Console.WriteLine($"Grade: {grade.GradeName} {grade.GradeId}");
                    //    foreach (var s in grade.Students)
                    //    {
                    //        Console.WriteLine($"Student: {s.FirstName} {s.LastName}");
                    //    }
                    //}
                    #endregion

                    #region without Lazy loading enabled, the Grade is null below as it is the virtual property in Student.
                    foreach (var item in schoolContext.Students)
                    {
                        Console.WriteLine($"{item.FirstName} {item.LastName} {item.Grade}");
                    }

                    //without lazy loading automatically, using eager loading below to load the Grade records
                    foreach (var item in schoolContext.Students.Include(x => x.Grade))
                    {
                        Console.WriteLine($"{item.FirstName} {item.LastName} {item.Grade}");
                    }
                    #endregion

                    //Student student = new Student();                    
                    //student.LastName = "Jack";
                    //student.FirstName = "First";
                    //student.Grade = new Grade() { GradeName = "Grade1" };

                    //schoolContext.Students.Add(student);

                    //Student student2 = new Student();
                    //student2.LastName = "Jack";
                    //student2.FirstName = "First";
                    //student2.Grade = new Grade() { GradeName = "Grade2" };

                    //schoolContext.Students.Add(student2);

                    //schoolContext.SaveChanges();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message, e.InnerException.Message);
                }
            }
        }
    }
}
