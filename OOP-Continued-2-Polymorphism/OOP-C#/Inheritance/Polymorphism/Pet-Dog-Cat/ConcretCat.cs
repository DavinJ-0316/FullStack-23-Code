using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism.Pet_Dog_Cat
{
    public class ConcretCat : AbstractPet
    {
        public override void Shout()
        {
            //base.Shout();
            Console.WriteLine($"Concret cat shout miao....");
        }
    }
}
