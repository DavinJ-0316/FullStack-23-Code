using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Constructor.Constructor_Base_Derived_Class
{
    public class Teacher : Person
    {
        private double _salary;
        private List<string> _course;
        public Teacher(string name, int age, string address, double salary, List<string> course) : base(name, age, address)
        {
            _salary = salary;
            _course = course;
        }
        public void ShowSalary()
        {
            Console.WriteLine($"Salary of Teacher is {_salary}");
        }
        public void ShowCourses()
        {
            Console.WriteLine("List of Courses");
            _course.ForEach(x => Console.WriteLine(x));
        }
    }
}
