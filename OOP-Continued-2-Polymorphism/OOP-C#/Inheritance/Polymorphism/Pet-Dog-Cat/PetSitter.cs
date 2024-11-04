using OOP_C_.Inheritance.Polymorphism.Pet_Dog_Cat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
		public partial class PetSitter
		{
				public void ShoutAfterDrink()
				{
						//AbstractPet pet = new AbstractPet();
						//Polymorphism
						AbstractPet abstractPet = new ConcretCat();
						abstractPet.Drink();
						abstractPet.Shout();

						AbstractPet abstractPet1 = new ConcretDog();
						abstractPet1.Drink();
						abstractPet1.Shout();

				}
		}
}
