using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Assignment_Encapsulation_Inherience
{
    public class Teacher
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int[] CourseIds { get; set; }

        public void PrintAllStudents(Student[] students)
        {
            Console.WriteLine($"Below students learning from Teacher {Name}:");
            foreach (Student student in students)
            {
                foreach(Course course in student.Courses)
                {
                    if (CourseIds.Contains(course.ID))
                    {
                        Console.WriteLine($"Studeng {student.Name}");
                        break;
                    }
                }
            }
        }
    }
}
