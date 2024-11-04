using DIP.IDataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class SimpleSamsung
    {
        //calling
        public void Call() { }
        //messaging
        public void TextReader() { }
    }

    public class Samsung : BasePhone
    {
        public override void Call()
        {
            Console.WriteLine($"Samsung call");
        }

        public override void TextReader()
        {
            Console.WriteLine($"Samsung text reader");
        }
    }
}
