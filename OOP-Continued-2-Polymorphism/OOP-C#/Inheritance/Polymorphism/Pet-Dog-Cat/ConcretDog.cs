using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism.Pet_Dog_Cat
{
		public class ConcretDog : AbstractPet
		{
				public override void Shout()
				{
						Console.WriteLine($"ConcretDog shout wong...");
				}
		}
}
