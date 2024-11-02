using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
    public class Samsung : BasePhoneWithPolymorphism
    {
        public override void SystemInfo()
        {
            Console.WriteLine($"{GetType().Name} system is Android");
        }
    }
}
