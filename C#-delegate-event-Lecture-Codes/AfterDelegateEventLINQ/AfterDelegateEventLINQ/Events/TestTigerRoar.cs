using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ
{
    internal class TestTigerRoar
    {
        /// <summary>
        /// 6.2.2 - Tiger Roar后产生的连锁反应 由下面的Response()方法体现 
        ///         
        /// </summary>
        public void Response()
        {
            //Multicast delegate :
            Tiger tiger = new Tiger();
            //6.2.3 下面表示在这个TigerRoarResponse类中有三个方法对Tiger Roar的动作感兴趣或者叫 逃跑
            tiger.RoarDelegateHandler += Sheep_Run;
            tiger.RoarDelegateHandler += People_Run;
            tiger.RoarDelegateHandler += Dog_Hide;						

						// 6.2.4 也可以是其他类的实例方法 对Tiger Roar的动作产生反应 
						tiger.RoarDelegateHandler += new Sheep().Run;
            tiger.RoarDelegateHandler += new People().Run;
            tiger.RoarDelegateHandler += new Dog().Run;

            //6.2.5 至此我们使用的委托方法的多播性 多播委托，可以在Tiger外部修改委托的调用，甚至可以将委托的实例设置为null
            //注意 这和下面的event形成了区别，也是为什么使用Event而不是委托方法的方式的原因
            tiger.RoarDelegateHandler.Invoke();
          //  tiger.RoarDelegateHandler();
            tiger.RoarDelegateHandler = null;

            tiger.Roar_V2();
        }

        //6.3 正是因为上面可以将Tiger.RoarDelegateHandler设置为null, 直接调用Invoke()方法 
        //    所以Tiger class 只是会 expose给外部 Event 而不是 public delegate
        //    如下面的代码示例
        public void Response_v2()
        {
            Tiger tiger = new Tiger();

            tiger.RoarDelegateEvent += Sheep_Run;
            tiger.RoarDelegateEvent += People_Run;
            tiger.RoarDelegateEvent += Dog_Hide;

            //使用event关键字后，下面的修改就是非法的
            //避免外部修改event对应的handler

            //思考 -- event 和 delegate的关系和区别是什么
            //event的本质 就是 delegate的实例 
            //tiger.RoarDelegateEvent.Invoke();
            //tiger.RoarDelegateEvent = null;

            //tiger.RoarDelegateEvent();
            //tiger.OnRoarHandler();
        }

        private void Sheep_Run() { }
        private void People_Run() { }
        private void Dog_Hide() { }
    }

    #region others
    public class People() 
    {
        public void Run() { }
    }
    public class Dog 
    {
        public void Run() { }
    }
    public class Sheep 
    {
        public void Run() { }
    }
    #endregion
}
