using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetLearning
{
    public class Repository<T> : IRepository<T>
    {
        private List<T> items = new List<T>();

        public void Add(T item)
        {
            items.Add(item);
        }

        public T GetById(int id)
        {
            return items[id];
        }
    }
}
