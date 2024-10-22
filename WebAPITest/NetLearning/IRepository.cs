using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetLearning
{
    //泛型接口
    public interface IRepository<T>
    {
        void Add(T item);
        T GetById(int id);
    }

}
