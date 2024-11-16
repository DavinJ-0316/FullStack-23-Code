namespace AfterDelegateEventLINQ.ObserverPatternBasic_7.OurWay
{
    /// <summary>
    /// 1. 在No_Pattern基础上我们做如下的考虑和修改
    /// 现实的需求是 订阅号存在多个订阅者，可以采用一个列表来保存所有的订阅者对象，在订阅号内部再添加对该列表的操作，这样就解决了出现新订阅者的问题。
    /// 并且订阅号也属于变化的部分，所以，我们可以采用相同的方式对订阅号进行抽象，抽象出一个抽象的订阅者接口 IObserver
    /// 2. 解耦了订阅者和推送者之间的紧耦合关系 
    /// </summary>
    //抽象类定义了公众号
    public class Publisher
    {
        // 保存订阅者列表
        private List<ISubscriber> observers = new List<ISubscriber>();

        public string Symbol { get; set; }
        public string Info { get; set; }
        public Publisher(string symbol, string info)
        {
            this.Symbol = symbol;
            this.Info = info;
        }

        #region 新增对订阅号列表的维护操作
        public void AddObserver(ISubscriber ob)
        {
            observers.Add(ob);
        }
        public void RemoveObserver(ISubscriber ob)
        {
            observers.Remove(ob);
        }
        #endregion

        public void Update()
        {
            // 遍历订阅者列表进行通知
            foreach (ISubscriber ob in observers)
            {
                if (ob != null)
                {
                    ob.ReceiveAndPrint(this);
                }
            }
        }
    }

    //定义具体的微信公众号
    public class WeiXinPublic : Publisher
    {
        public WeiXinPublic(string symbol, string info) : base(symbol, info) { }
    }

    // 订阅者接口
    public interface ISubscriber
    {
        void ReceiveAndPrint(Publisher publisher);
    }

    // 具体的订阅者类
    public class Subscriber : ISubscriber
    {
        public string Name { get; set; }
        public Subscriber(string name)
        {
            Name = name;
        }
        public void ReceiveAndPrint(Publisher tenxun)
        {
            Console.WriteLine("Notified {0} of {1}'s" + " Info is: {2}", Name, tenxun.Symbol, tenxun.Info);
        }
    }

    //测试代码
    public class Program
    {
        public static void Test()
        {
            Publisher weixin = new WeiXinPublic("Weixin", "Have a new game published ....");
            // 添加订阅者
            weixin.AddObserver(new Subscriber("Learning Hard"));
            weixin.AddObserver(new Subscriber("Tom"));

            weixin.Update();

            Console.ReadLine();
        }
    }
}
