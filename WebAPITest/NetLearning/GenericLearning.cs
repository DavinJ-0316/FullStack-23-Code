using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetLearning
{
    //this is a generic class
    public class GenericClass<T>
    {
        private T data;//field

        //constructor
        public GenericClass(T value)
        {
            data = value;
        }

        //method
        public T GetData()
        {
            return data;
        }

        public T Show(T value)
        {
            return value;
        }
    }
}
