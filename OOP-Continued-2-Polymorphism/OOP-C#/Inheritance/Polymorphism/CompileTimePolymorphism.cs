using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
    public class CompileTimePolymorphism
    {
        //overload
        //compiling time 
        public int Foo() { return 1; }
        //返回值不属于method signature, 重载方法不能根据返回值的不同来决定 必须是参数
        //public int Foo() { return 0; }
        public int Foo(int i) { return i+1; }
        public string Foo(string i, int j) { return $"{i} {j}"; }

        public string Hoo() { return string.Empty; }
    }
}
