using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
    public class iPhone : BasePhoneWithPolymorphism, IExtend
    {
        public int this[int index] => throw new NotImplementedException();

        public event IExtend.Action ActionHandler;
        private string _name;
				public override string Name2
				{
						get
						{
								return _name;
						}
						set
						{
								if (!string.IsNullOrEmpty(value))
								{
										_name = value;
								}
								else
								{
										_name = "Unknown";
								}
						}
				}

				public override void SystemInfo()
        {
            Console.WriteLine($"{GetType().Name} system is iOS");            
        }

        public override void VirtualCall()
        {
            //base.VirtualCall();
            Console.WriteLine($"{GetType().Name} VirtualCall");
        }

        public void Video()
        {
            Console.WriteLine($"Video from iPhone");
        }

        public void Video(int i)
        {
            Console.WriteLine($"Video from iPhone {i}");
        }        
    }
}
