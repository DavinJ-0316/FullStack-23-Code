using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism.Pet_Cat_Dog
{
	public class Dog:Pet
	{
		public void Eat() 
		{
            Console.WriteLine($"Dog eat.");
        }
	}
}
