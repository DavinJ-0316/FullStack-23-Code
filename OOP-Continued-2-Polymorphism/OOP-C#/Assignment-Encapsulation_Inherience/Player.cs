using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Assignment_Encapsulation_Inherience
{
    public class PlayerAssignment
    {
        public void Play()
        {
            #region Create course instances - 有没有人先定义course instance然后赋值给student的? 这样有什么问题吗?
            CSharpCourse cSharpCourse = new CSharpCourse
            {
                Name = "CSharp",
                ID = 1,
                Hours = 30
            };
            HTMLCourse hTMLCourse = new HTMLCourse
            {
                Name = "HTML",
                ID = 2,
                Hours = 20
            };
            ReactCourse reactCourse = new ReactCourse
            {
                Name = "React",
                ID = 3,
                Hours = 40
            };
            #endregion

            #region 准备数据 teacher student course

            #region Teachers
            Teacher cSharpTeacher = new Teacher { Name = "Peng Dai", ID = 1000, CourseIds = [1] };
            Teacher htmlTeacher = new Teacher { Name = "Jenny Ma", ID = 1002, CourseIds = [2] };
            Teacher reactTeacher = new Teacher { Name = "Kevin Liu", ID = 1003, CourseIds = new[] { 3 } };
            #endregion

            #region students
            Student[] students = new Student[10];
            Student studentJack = new Student
            { 
                ID = 1, 
                Name = "Jack", 
                Age = 20, 
                Courses = new Course[] 
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 90 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 95 },
                    new ReactCourse{ Name = "React", ID = 3, Hours = 40, Score = 96 }
                } 
            };
            students[0] = studentJack;
            Student studentPeter = new Student
            {
                ID = 2,
                Name = "Peter",
                Age = 19,
                Courses = new Course[]
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 80 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 85 },                   
                }
            };
            students[1] = studentPeter;
            Student studentLee = new Student
            {
                ID = 3,
                Name = "Lee",
                Age = 22,
                Courses = new Course[]
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 88 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 95 },
                }
            };
            students[2] = studentLee;
            Student studentOct = new Student
            {
                ID = 4,
                Name = "Oct",
                Age = 21,
                Courses = new Course[]
               {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 92 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 90 },
               }
            };
            students[3] = studentOct;
            Student studentChalie = new Student
            {
                ID = 5,
                Name = "Chalie",
                Age = 26,
                Courses = new Course[]
               {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 82 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 91 },
                     new ReactCourse{ Name = "React", ID = 3, Hours = 40, Score = 83 }
               }
            };
            students[4] = studentChalie;
            Student studentMarry = new Student
            {
                ID = 6,
                Name = "Marry",
                Age = 18,
                Courses = new Course[]
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 88 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 85 },
                    new ReactCourse{ Name = "React", ID = 3, Hours = 40, Score = 86 }
                }
            };
            students[5] = studentMarry;
            Student studentHooker = new Student
            {
                ID = 7,
                Name = "Hooker",
                Age = 19,
                Courses = new Course[]
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 78 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 95 },
                }
            };
            students[6] = studentHooker;
            Student studentAnna = new Student
            {
                ID = 8,
                Name = "Anna",
                Age = 17,
                Courses = new Course[]
                {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 94 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 90 },
                }
            };
            students[7] = studentAnna;
            Student studentKuma = new Student
            {
                ID = 9,
                Name = "Kuma",
                Age = 21,
                Courses = new Course[]
               {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 84 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 96 },
               }
            };
            students[8] = studentKuma;
            Student studentNotail = new Student
            {
                ID = 10,
                Name = "Notail",
                Age = 26,
                Courses = new Course[]
               {
                    new CSharpCourse { Name = "CSharp", ID = 1, Hours = 30, Score = 82 },
                    new HTMLCourse { Name = "HTML", ID = 2, Hours = 20, Score = 91 },
                     new ReactCourse{ Name = "React", ID = 3, Hours = 40, Score = 83 }
               }
            };
            students[9] = studentNotail;
            #endregion

            cSharpCourse.PrintTop3Student(students);
            cSharpTeacher.PrintAllStudents(students);

            hTMLCourse.PrintTop3Student(students);
            htmlTeacher.PrintAllStudents(students);

            reactCourse.PrintTop3Student(students);
            reactTeacher.PrintAllStudents(students);

            #endregion
        }
    }
}
