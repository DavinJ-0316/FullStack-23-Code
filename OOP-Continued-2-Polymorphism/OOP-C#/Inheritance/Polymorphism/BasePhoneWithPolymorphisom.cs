using OOP_C_.Encapsulation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance.Polymorphism
{
    /// <summary>
    ///抽象类 ： 首先是用来作为基类 抽象方法用来约束子类 必须实现
    /// 具备多态特征的基类
    /// 解决 子类都必须无条件继承 但是又允许差异化的基类
    /// </summary>
    public abstract class BasePhoneWithPolymorphism
    {
        #region 无条件被迫继承的属性和方法
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int VersionNo { get; set; }
				public virtual string Name2 { get; set; }
       
				public void Call()
        {
            Console.WriteLine($"{GetType().Name} calling");                        
        }

        public void Text()
        {
            Console.WriteLine($"{GetType().Name} messaging");
        }

        //有默认实现
        public virtual void VirtualCall()
        {
            Console.WriteLine($"{GetType().Name} VirtualCall");            
        }

        protected virtual void ProtectedMethod()
        {
            Console.WriteLine($"{GetType().Name} ProtectedMethod");
        }

        public void PlayGame(Game game)
        {
            game.Start();
        }
        #endregion

        #region 允许差异化的方法 定义为抽象的
        //要注意抽象方法必须定义在抽象类中 所以必须将类定义为abstract的
        public abstract void SystemInfo();
        #endregion
    }

    public class BaseClassWithoutAbstract()
    {
        public virtual void Method1() 
        {

        }
    }

    public class SubClass : BaseClassWithoutAbstract
    {
				public override void Method1()
				{
            Console.WriteLine();
        }
		}

		public class SubClass2 : BaseClassWithoutAbstract
		{
				public override void Method1()
				{
						Console.WriteLine();
				}
		}
}
