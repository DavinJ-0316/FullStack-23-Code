using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Constructor.Constructor_Base_Derived_Class
{
    public class Person
    {
        private string s = "dddd";
        public string Name
        {
            get;
            private set;
        }
        public int Age
        {
            get;
            private set;
        }
        public string Address
        {
            get;
            private set;
        }

        public Person(string name, int age, string address)
        {
            Name = name;
            Age = age;
            Address = address;
        }
    }
}
