using DIP.IDataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
	public class SimpleHuaWei
	{
			//calling
			public void Call() { }
			//messaging
			public void TextReader() { }
	}

	public class HuaWei : BasePhone
	{
		public override void Call()
		{
			Console.WriteLine($"Hua Wei call");
		}

		public override void TextReader()
		{
			Console.WriteLine($"Hua Wei text reader");
		}
	}
}
