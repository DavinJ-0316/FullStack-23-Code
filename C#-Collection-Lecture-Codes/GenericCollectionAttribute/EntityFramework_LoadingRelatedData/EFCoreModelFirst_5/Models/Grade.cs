using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCoreModelFirst_5.Models
{
    public class Grade
    {
        private ILazyLoader LazyLoader { get; set; }

        public Grade()
        {
           // Students = new List<Student>();
        }

        //private Grade(ILazyLoader lazyLoader)
        //{
        //    LazyLoader = lazyLoader;
        //}

        public int GradeId { get; set; }
        public string GradeName { get; set; }

        //private IList<Student> _students;
        //public IList<Student> Students
        //{
        //    get => LazyLoader.Load(this, ref _students);
        //    set => _students = value;
        //}

        //virtual keywords 
        public virtual IList<Student> Students { get; set; }
    }
}
