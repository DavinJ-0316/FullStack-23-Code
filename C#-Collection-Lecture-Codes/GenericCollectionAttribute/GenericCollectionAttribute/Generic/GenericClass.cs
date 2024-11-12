using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    /// <summary>
    /// 一个类来满足不同的具体类型 这个类对不同的类型 所变现的行为是一致的
    /// </summary>
    public class GenericClass<T>
    {
        public T _T;

        public GenericClass() { }
        public GenericClass(T t)
        {
            _T = t;
        }

        public T GetValue() { return _T; }
    } 
    
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="S"></typeparam>
    /// <typeparam name="U"></typeparam>
    /// <typeparam name="V"></typeparam>
    public class GenericClass<T,S,U,V>
    {
        public T _T;
    }

    /// <summary>
    /// 泛型接口 类似 一个接口满足不同的类型 做相同的事
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IGenericInterface<T>
    {
        void DisplayValue(T t);

        T DisplayAndReturnValue(T t);
    }

    public class CustomClass<T> : IGenericInterface<T>
    {
        public T DisplayAndReturnValue(T t)
        {
            Console.WriteLine($"Diaplaying and return value {t}");

            return t;
        }

        public void DisplayValue(T t)
        {
            Console.WriteLine($"Diaplaying value {t}");
        }
    }

    /// <summary>
    /// 泛型委托 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="t"></param>
    public delegate void ReturnValue<T>(T t);
}
