using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCoreModelFirst_5.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int GradeId { get; set; }
        public virtual Grade Grade { get; set; }
    }
}
