namespace AfterDelegateEventLINQ.ObserverPatternBasic_7.DelegateEvent
{
    // 委托充当订阅者接口类
    public delegate void NotifyEventHandler(object sender, string s);


    public class Service
    {
        public event NotifyEventHandler Notify;
        public void Method() 
        {
            //3rd API call --> response
            //send message

            string responseMessage = ""; //remote API returns message
            Notify(this, responseMessage);
        }
    }

    public class Consumer
    {
        public void Consume()
        {
            Service service = new Service();
            service.Notify += new NotifyEventHandler(WriteLog);
        }

        public void WriteLog(Object sender, string s)
        {

        }
    }   

    // 订阅号类
    public class Publisher
    {
        //使用了多播委托的chain来实现对多个订阅者的通知
        public NotifyEventHandler NotifyEvent;
        //使用event代替上述的delegate 实例，应该有同样的效果，并且不需要Add/Remove Observer方法来对订阅者进行维护
        public event NotifyEventHandler OnNotify;



        public string Symbol { get; set; }
        public string Info { get; set; }
        public Publisher(string symbol, string info)
        {
            Symbol = symbol;
            Info = info;
        }

        #region 新增对订阅号列表的维护操作
        public void AddObserver(NotifyEventHandler ob)
        {
            NotifyEvent += ob;//method1 --> method2 -->method3
        }
        public void RemoveObserver(NotifyEventHandler ob)
        {
            NotifyEvent -= ob;
        }
        #endregion

        public void Update()
        {
            if (NotifyEvent != null)
            {
                Console.WriteLine($"Trigger delegate.....");
               // NotifyEvent(this);
            }

            if (OnNotify != null)
            {
                Console.WriteLine($"Trigger event.....");
               // OnNotify(this);
            }
        }
    }

    // 微信公众号 - 具体的订阅类型
    public class WeiXinPublic : Publisher
    {
        public WeiXinPublic(string symbol, string info) : base(symbol, info) { }
    }

    // 具体订阅者类
    public class Subscriber
    {
        public string Name { get; set; }
        public Subscriber(string name)
        {
            this.Name = name;
        }

        public void ReceiveAndPrint(Object obj)
        {
            WeiXinPublic weixin = obj as WeiXinPublic;

            if (weixin != null)
            {
                Console.WriteLine("Notified {0} of {1}'s" + " Info is: {2}", Name, weixin.Symbol, weixin.Info);
            }
        }
    }

    //测试代码
    public class Program
    {
        public static void Test()
        {
            Publisher weixin = new WeiXinPublic("TenXun Game", "Have a new game published ....");
            Subscriber lh = new Subscriber("Learning Hard");
            Subscriber tom = new Subscriber("Tom");

            // 添加订阅者
            //使用多播委托来实现
            //weixin.AddObserver(new NotifyEventHandler(lh.ReceiveAndPrint));
            //weixin.AddObserver(new NotifyEventHandler(tom.ReceiveAndPrint));
            //使用事件event来实现
            //weixin.OnNotify += new NotifyEventHandler(lh.ReceiveAndPrint);
            //weixin.OnNotify += new NotifyEventHandler(tom.ReceiveAndPrint);

            weixin.Update();

            Console.WriteLine("-----------------------------------");
            Console.WriteLine("Unsubscribe Tom");
            //weixin.RemoveObserver(new NotifyEventHandler(tom.ReceiveAndPrint));
            //weixin.OnNotify -= new NotifyEventHandler(tom.ReceiveAndPrint);

            weixin.Update();

            Console.ReadLine();
        }
    }
}
