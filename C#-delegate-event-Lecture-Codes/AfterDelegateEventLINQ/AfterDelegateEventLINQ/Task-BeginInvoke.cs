using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ
{
    public delegate int IntReturnNoParam();

    public class Task_BeginInvoke
    {
        //4. 委托的 beginInvoke方法调用 - 注意 在新的.net core 平台不再支持 beginInvoke/endInvoke
        public async void BeginInvokeSample()
        {
            IntReturnNoParam method = new IntReturnNoParam(GetInt);
            //4.1 异步调用
            //注意 在新的.net core 平台不再支持 beginInvoke/endInvoke
            method.BeginInvoke(null, null);

            //4.1.1 在.Net Framework 平台的已有项目如果看到如下的代码
            //表示 以异步方式获取返回值
            //var result = method.BeginInvoke(null, null);
            //var i = method.EndInvoke(result);

            //使用下面的Task方式来实现异步调用            
            Task<int> task = Task.Run(GetInt);
            Console.WriteLine($"BeginInvokeSample Thread Id: {Thread.CurrentThread.ManagedThreadId}");
            Task voidTask = Task.Run(VoidMethod);

            //await 和 task.Wait()是不一样的效果 
            //await 将控制权返回给调用方 而.Wait() 会一直等待task的完成 -- 在异步编程中会介绍
            await task;
            //task.Wait();
            //ThreadPool - thread pool 
            Console.WriteLine($"The return result of GetInt is {task.Result} in thread {Thread.CurrentThread.ManagedThreadId}");
        }

        private int GetInt()
        {
            Thread.Sleep(2000);
            Console.WriteLine($"GetInt Thread Id: {Thread.CurrentThread.ManagedThreadId}");
            return 10;
        }

        private void VoidMethod() { }
    }
}
