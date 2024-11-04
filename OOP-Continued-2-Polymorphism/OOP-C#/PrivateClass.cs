using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_
{
    //internal is the default if no access modifier is specified
    class PrivateClass
    {
        public string Name { get; set; }

        public void Method1() { }
    }

    internal class PrivateClass2
    {
        public string Name { get; set; }

        public void Method1() { }
    }
}
