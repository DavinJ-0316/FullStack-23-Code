using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    public class Employee
    {
        public Employee(string name, int id) => (Name, ID) = (name, id);
        public string Name { get; set; }
        public int ID { get; set; }
    }

    public class Course { }
}
