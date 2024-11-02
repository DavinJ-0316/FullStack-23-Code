using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Constructor.Constructor_Base_Derived_Class
{
    public class Student : Person
    {
        private double _fee = 10;
        public Student(string name, int age, string address, double salary) : base(name, age, address)
        {
            _fee = salary;
        }
        public void ShowFee()
        {
            Console.WriteLine($"Salary of Teacher is {_fee}");
        }
    }
}
