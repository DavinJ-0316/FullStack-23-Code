using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    public interface ICustomListOut<out T>
    {
        T Show();
    }

    public class CustomListOut<T> : ICustomListOut<T>
    {
        public T Show()
        {
            Console.WriteLine($"Show");
            return default(T);
        }
    }

    public interface ICustomListIn<in T>
    {
        void Show(T t);
    }

    public class CustomListIn<T> : ICustomListIn<T>
    {
        public void Show(T t)
        {
            Console.WriteLine($"{t.GetType().Name}");
        }
    }

    public interface IInOutCustomList<in T, out TResult> where TResult : new()
    {
        public TResult Get(T t);
    }

    public class InOutCustomList<T, TResult> : IInOutCustomList<T, TResult> where TResult : new()
    {
        public TResult Get(T t)
        {
            Console.WriteLine($"{t.GetType().FullName}");

            return new TResult();
        }
    }
}
