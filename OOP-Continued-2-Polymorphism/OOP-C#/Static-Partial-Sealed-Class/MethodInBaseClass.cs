using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Static_Partial_Sealed_Class
{
    public class MethodInBaseClass
    {
        public virtual void PrintName()
        {
        }

        public void PrintoutMethodName() { }
    }

    public class SealedDerivedClass : MethodInBaseClass
    {
        public override sealed void PrintName()
        {
            base.PrintName();
        }
    }

    public class GrandDerivedClass : SealedDerivedClass
    {
				//GrandDerivedClass 不可继续重写 PrintName 方法
				//只能调用基类的方法
				public void Print()
        {
            base.PrintName();
        }
    }
}
