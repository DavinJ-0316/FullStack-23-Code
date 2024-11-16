using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ.ObserverPatternBasic_7.NoPattern
{
    /// <summary>
    /// 1. 该例子实现了订阅-推送
    /// 2. 但是订阅者和推送者之间是紧耦合的关系
    ///    新增一个新的订阅者都必须修改推送者代码
    /// </summary>
    public class WeixinPublic
    {
        // 订阅者对象
        public Subscriber Subscriber { get; set; }
        public String Symbol { get; set; }

        public string Info { get; set; }

        public void Update()
        {
            if (Subscriber != null)
            {
                // 调用订阅者对象来通知订阅者
                Subscriber.ReceiveAndPrintData(this);
            }
        }
    }

    // 订阅者类
    public class Subscriber
    {
        public string Name { get; set; }
        public Subscriber(string name)
        {
            this.Name = name;
        }

        public void ReceiveAndPrintData(WeixinPublic weixin)
        {
            Console.WriteLine("Notified {0} of {1}'s" + " Info is: {2}", Name, weixin.Symbol, weixin.Info);
        }
    }

    public class Program
    {
        public static void Test()
        {
            // 实例化订阅者和订阅号对象
            Subscriber LearningHardSub = new Subscriber("LearningHard");
            WeixinPublic wexin = new WeixinPublic();

            wexin.Subscriber = LearningHardSub;
            wexin.Symbol = "TenXun Game";
            wexin.Info = "Have a new game published ....";

            wexin.Update();

            Console.ReadLine();
        }
    }
}
