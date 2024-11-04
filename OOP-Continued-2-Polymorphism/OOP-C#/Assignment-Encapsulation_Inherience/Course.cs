using OOP_C_.Constructor.Constructor_Base_Derived_Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Assignment_Encapsulation_Inherience
{
    public class Course
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Score { get; set; }
        public int Hours { get; set; }

        public void PrintTop3Student(Student[] students)
        {
            Student[] selectedCourseStudents = new Student[students.Length];
            Student[] sortedStudents = new Student[students.Length];
            Console.WriteLine($"Top 3 student learning course : {Name}");
            int index = 0;

            foreach (Student student in students)
            {                
                foreach(Course course in student.Courses)
                {
                    if(course.ID == ID)
                    {
                        selectedCourseStudents[index] = student;                        
                        index++;
                        break;
                    }
                }    
            }

            Student[] nonNullStudents = selectedCourseStudents.Where(x => x != null).ToArray();
            SortStudent(nonNullStudents);
            int count = 0;
            for(int i = nonNullStudents.Length - 1; i > 0; i--)
            {
                if (count > 2) break;
                foreach (Course course in nonNullStudents[i].Courses)
                {
                    if (course.ID == ID)
                    {
                        Console.WriteLine($"{nonNullStudents[i].Name}: {course.Score}");
                        count++;
                        break;
                    }
                }
            }

            //foreach (Student student in selectedCourseStudents)
            //{   
            //    foreach (Course course in student.Courses)
            //    {
            //        if (course.ID == ID)
            //        {
            //            Console.WriteLine($"{student.Name}: {course.Score}");
            //            break;
            //        }
            //    }
            //}
        }

        private Student[] SortStudent(Student[] students)
        {            
            for (int i = 0; i < students.Length - 1; i++)
            {
                for (int j = 0; j < students.Length - 1 - i; j++)
                {
                    Course jCourse = new Course();
                    Course afterJCourse = new Course();

                    if (students[j] != null)
                    {
                        foreach (Course course in students[j].Courses)
                        {
                            if (course.ID == ID)
                            {
                                jCourse = course;
                                break;
                            }
                        }

                        foreach (Course course in students[j + 1].Courses)
                        {
                            if (course.ID == ID)
                            {
                                afterJCourse = course;
                                break;
                            }
                        }

                        if (jCourse.Score > afterJCourse.Score)
                        {
                            Student temp = new Student { ID = students[j].ID, Age = students[j].Age, Name = students[j].Name, Courses = students[j].Courses };
                            students[j] = students[j + 1];
                            students[j + 1] = temp;
                        }
                    }
                }
            }  
            
            return students;
        }
    }
}
