using OOP_C_.Inheritance.Polymorphism.Pet_Cat_Dog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
    public partial class PetSitter
    {
        public void FeedPet()
        {
            #region call the method in the class, hide the base method
            Pet pet = new Pet();
            pet.Eat();

            Dog dog = new Dog();
            dog.Eat();

            Cat cat = new Cat();
            cat.Eat();
            #endregion

            #region 
            Pet pet1 = new Dog();
            pet1.Eat();//call which method?

            Pet pet2 = new Cat();
            pet2.Eat();

            Dog dog1 = new Dog();
            dog1.Eat();
            #endregion

        }       
    }
}
