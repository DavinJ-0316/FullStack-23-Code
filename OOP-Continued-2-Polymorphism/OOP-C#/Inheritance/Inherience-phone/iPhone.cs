using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance
{
    public class iPhone:BasePhone
    {
        public void SystemInfo()
        {
            Console.WriteLine($"{GetType().Name} system is iOS");
        }               
    }
}
