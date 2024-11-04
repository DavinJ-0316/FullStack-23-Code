using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Static_Partial_Sealed_Class
{
    /// <summary>
    /// 静态类只能包含静态属性和方法以及常量
    /// 静态类可以给所有其他类共享
    /// </summary>
    public static class StaticHelper
    {
        public const string Name = "Helper";
        public static string GetName() { return Name; }

        public static int ReturnAbs(int x)
        {
            return Math.Abs(x);
        }

        public static double ReturnAsin(double x)
        {
            return Math.Asin(x);
        }

        //静态类只能包含静态成员
        //public void Show()
        //{

        //}
    }
}
