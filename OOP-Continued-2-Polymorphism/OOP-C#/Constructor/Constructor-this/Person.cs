using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Constructor.Constructor_this
{
    public class Person
    {
        public string Name
        {
            get;
            private set;
        }
        public int Age
        {
            get;
            private set;
        }
        public string Address
        {
            get;
            private set;
        }

        /// <summary>
        /// 无参构造函数 - 如果声明了下面的有参构造函数 而不显式声明无参构造函数, 将没有
        /// </summary>
        //public Person() 
        //{
        //    Name = string.Empty;
        //    Age = 0;
        //    Address = string.Empty;
        //}


        /// <summary>
        /// 自定义构造函数,编译器将不会自动生成上面的无参构造函数
        /// 写法1,没有构造函数重载
        /// </summary>
        /// <param name="name"></param>
        /// <param name="age"></param>
        /// <param name="address"></param>
        //public Person(string name, int age, string address)
        //{
        //    Name = name;
        //    Age = age;
        //    Address = address;
        //}

        public Person(string name)
        {
            Name = name;
        }

        public Person(string name, int age) : this(name)
        {
            Age = age;
        }

        /// <summary>
        /// 写法2,构造函数重载 this调用
        /// </summary>
        /// <param name="name"></param>
        /// <param name="age"></param>
        /// <param name="address"></param>
        public Person(string name, int age, string address) : this(name, age)
        {
            Address = address;
        }
    }
}
