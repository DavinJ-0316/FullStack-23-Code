using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Collection
{
    public class KFCMenu
    {
        private Food[] foods = new Food[3];
        public KFCMenu()
        {
            foods[0] = new Food { Id = 1, Name = "Chicken", Price = 10.00 };
            foods[1] = new Food { Id = 2, Name = "Beef", Price = 20.00 };
            foods[2] = new Food { Id = 3, Name = "Seafood", Price = 30.00 };
        }

        public Food[] GetFoods() { return foods; }

        public IIterator<Food> GetEnumerator()
        {
            return new KFCMenuIterator(this);
        }
    }
}
