using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Static_Partial_Sealed_Class
{
    public static class Extension
    {
        public static int CountWords(this string str)
        {
            return str.Split(new char[] { ' ', '.', '?' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }

        public static void LINQExtensionMethods()
        {
            IList<string> strings = new List<string>();

            //LINQ定义的扩展方法
            strings.GroupBy(x => x);
        }
    }
}
