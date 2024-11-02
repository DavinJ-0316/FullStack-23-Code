using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism.Pet_Dog_Cat
{
    public abstract class AbstractPet
    {
        public abstract void Shout();
        public virtual void Drink()
        {
            Console.WriteLine($"Pet drink water");
        }
    }
}
