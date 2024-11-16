namespace AfterDelegateEventLINQ
{
    public class MulticastDelegate_4
    {
        //5. 多播委托
        //从IL 可以看出 所有的delegate 都是继承于 同一个类 
        //.class nested public auto ansi sealed VoidReturnParam
        //extends[System.Runtime]System.MulticastDelegate
        //顺序调用链接的方法 依次执行

        //5.1 委托的实例方法可以来自于 静态方法，同一个class的私有方法 甚至其他class的方法

        //5.2 但是多播委托是不能异步的 - 换而言之 在.Net Framework 平台 不要对多播委托调用BeginInvoke
        //    在.Net Core 平台 不要使用Task.Run()来执行多播委托实例
        //以最后的调用方法返回值为最终的结果
        public void MulticastDelegateExample()
        {
            // += 为委托实例按顺序添加方法 形成方法链 依次执行
            IntReturnNoParam method = new IntReturnNoParam(GetInt);
            method += new IntReturnNoParam(GetInt20);
            method += new IntReturnNoParam(GetInt30);
            method += new IntReturnNoParam(GetInt40);
            method += new IntReturnNoParam(GetInt50Static);
            
            var i = method();
            Console.WriteLine($"The multi cast delegate result is {i}");

            //下面的方法会返回虽有的委托方法实例列表
            Delegate[] ms = method.GetInvocationList();

            foreach (IntReturnNoParam s in method.GetInvocationList())
            {
                //每个s是一个委托的实例方法
            }

            // -= 为委托实例移除方法 从链的尾部开始匹配 遇到吻合的就移除 没有不报错
            method -= new IntReturnNoParam(GetInt);
            method -= new IntReturnNoParam(GetInt20);
            method -= new IntReturnNoParam(GetInt30);
            method -= new IntReturnNoParam(GetInt40);
            method -= new IntReturnNoParam(GetInt50Static);						

						//即使method没有方法了 为空也不异常
						method -= new IntReturnNoParam(GetInt);
            //但是调用的时候 因为method已经是null了 所以不能调用
            method();
            //所以在实际应用中我们常常判断一下是否为空
            if(method !=null) method();            
        }

        private int GetInt()
        {
            Console.WriteLine($"GetInt10 called");
            return 10;
        }
        private int GetInt20()
        {
            Console.WriteLine($"GetInt20 called");
            return 20;
        }
        private int GetInt30()
        {
            Console.WriteLine($"GetInt30 called");
            return 30;
        }
        private int GetInt40()
        {
            Console.WriteLine($"GetInt40 called");
            return 40;
        }

        private static int GetInt50Static()
        {
            Console.WriteLine($"GetInt50 called");
            return 50;
        }

        //5.3 那么为什么需要多播委托呢? 引入Event的概念 来看看 事件 
    }
}
