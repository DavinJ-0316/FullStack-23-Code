using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Constructor.Constructor_Base_Derived_Class
{
    public class Accountant : Person
    {
        private double _salary;
        public Accountant(string name, int age, string address, double salary) : base(name, age, address)
        {
            _salary = salary;
        }
        public void ShowSalary()
        {
            Console.WriteLine($"Salary of Teacher is {_salary}");
        }
        public void ManagePayRoll()
        {
            Console.WriteLine("Payrolls are managed by accountant");
        }
    }
}
