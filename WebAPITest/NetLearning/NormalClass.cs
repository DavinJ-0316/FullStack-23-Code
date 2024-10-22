using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetLearning
{
    public class NormalClass
    {
        //private int num;
        //public NormalClass(int value)
        //{
        //    num = value; ;
        //}
        //public int GetData() { return num; }

        //private string num;
        //public NormalClass(string value)
        //{
        //    num = value; ;
        //}
        //public string GetData() { return num; }

        private object num;
        public NormalClass(object value)
        {
            num = value; ;
        }

        public object GetData() { return num; }


        //public void Show<T>(T value)
        //{
        //    Console.WriteLine(value);
        //}
    }
}

