using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ClassId { get; set; }
        public int Age { get; set; }

        public void Study()
        {
            Console.WriteLine($"Student {Name} is studying class {ClassId} at {DateTime.Now}");
        }

        public static void StudyAdvanced() { }
        public static void Show() { }
    }
}
