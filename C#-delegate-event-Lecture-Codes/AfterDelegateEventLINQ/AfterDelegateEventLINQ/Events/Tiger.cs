namespace AfterDelegateEventLINQ
{
    //6. 通过这个示例想说明Event存在的作用和意义 - 老虎一吼 百兽皆躲
    //  6.2 定义一个Roar的委托类型
    public delegate void RoarDelegate();  //sealed class inherits from MultiCastDelegate  
   
    internal class Tiger
    {
        #region 6.1 没有委托的情况下 我们的代码实现如下 老虎吼叫后 调用其他动物的Run()方法 来实现百兽皆躲的动作
        public void Roar()
        {
            Console.WriteLine($"The tiger roaring.....");

            new Sheep().Run();
            new People().Run();
            new Dog().Run();
        }
        #endregion

        #region 这样的实现有什么问题呢--- 如果有新的动物也Run,我们就必须修改Tiger class的Roar()方法，每新增或者减少一个动物就要修改这个方法
        //        这样的修改显然是破坏了Tiger class的封装性 而且其他动物的Run() 跟老虎有没有关系? 是不是不应该由Tiger的 Roar()来调用呢?
        //        所以我们来看看 下面 通过 委托类型怎么实现

        //6.2 定义一个public的委托实例 当前它为null
        public RoarDelegate RoarDelegateHandler;

        /// <summary>
        /// 6.2.1 老虎一吼，引发一连串的反应 但是具体的反应不应该由Tiger 类负责
        ///       Tiger只负责Roar
        /// </summary>
        public void Roar_V2()
        {
            Console.WriteLine($"The tiger roaring.....");
            if (RoarDelegateHandler != null)
            {
                RoarDelegateHandler();
            }
        }
        #endregion

        #region 6.3 定义一个Event 通过上面的委托实例定义比较 就是在前面加个Event关键字
        public event  RoarDelegate RoarDelegateEvent;
        
        private void OnRoarHandler()
        {
            Console.WriteLine($"The tiger roaring.....");
            if (RoarDelegateEvent != null)
            {
                RoarDelegateEvent();
            }
        }

        private void Method1()
        {
						OnRoarHandler();
        }

        #endregion
    }
}
