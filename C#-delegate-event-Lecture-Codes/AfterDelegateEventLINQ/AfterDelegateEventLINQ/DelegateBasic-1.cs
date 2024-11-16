namespace AfterDelegateEventLINQ
{
    #region 介绍什么是委托 - 委托长什么样子
    /// <summary>   
    //   1.1 几个定义和声明委托的例子 - 在方法定义的前面加上delegate关键字 并且没有方法体
    //   1.2 委托的方法声明可以无参 有参 无返回值 有返回值 甚至可以有out ref关键字的参数
    public delegate void NoReturnNoParam();
    public delegate void VoidReturnParam(int x, int y);    
    public delegate int IntReturnWithParam(int x);
    public delegate string WithStringReturnWithParam(string x, out int y, ref int z);

    //1.4 还可以声明一个泛型委托 以支持不同类型的方法
    public delegate void NoReturnGenericParam<T>(T t);
    #endregion

    #region 通过ILSpy -- 解密delegate 也是一个class    
    //  .class nested public auto ansi sealed VoidReturnParam
    //  extends[System.Runtime]System.MulticastDelegate
    /// </summary>
    /// 
    ///总计一下 委托就是一个类 继承自 多播委托类 内置了一些Invoke BeginInvoke EndInvoke方法
    #endregion

    #region delegate associate with named method​
    public class DelegateBasic
    {
        /// <summary>
        /// 1.3 委托可以放在class定义的内部 也可以放在外部 自定义一个委托 -  输入输出参数都是string
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public delegate string CustomEventHandler(string input);

        //1.6 通过实例化来创建委托类型的实例
        //类比 - 先来实例化 Student
        public void Show()
        {
            {
                Student student = new Student() { Name = "Jack", Age = 25, Id = 1, ClassId = 1 };
                student.Study();
            }

            {
                //1.6.1 那么实例化委托 new 后面是什么呢? 构造函数又是什么形式的呢 -- 构造函数的参数是一个"方法"(这个方法的signature必须和委托定义的时候一样的)
                //      注意 -- 我们定义了两个重载的方法 Handler，构造委托的时候只能使用第一个带参数 返回string的， 例子如下
                CustomEventHandler customEventHandler = new CustomEventHandler(Handler);

                //1.6.2 调用委托的方式 既可以调用Invoke， 也可以像普通方法一样 -- 等同与调用了 Handler("aa")方法
                var s = customEventHandler.Invoke("aa");
                var t = customEventHandler("bbb");

                Console.WriteLine($"{s} {t}");              
            }            
        }

        public static void ShowStatic()
        {

        }
        public string Handler(string s) { return s; }
        public void Handler() { }
    }

    #endregion
}
