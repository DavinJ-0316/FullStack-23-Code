using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ.Lambda_LINQ
{
    public delegate void NoReturnNoParam();
    public delegate void NoReturnWithPara(int i, string s);

    public class LambdaBasic
    {
        /// <summary>
        /// 8. 介绍Lambda表达式 它是学习 LINQ 的基础和准备 
        /// 先来下个定义 Lambda 表达式是什么， 它是匿名函数 LINQ 依赖于Lambda expression
        /// </summary>
        public void HistoryExplain()
        {
            {
                //1.0 - 通过传入一个方法名给委托来创建委托实例
                NoReturnWithPara noReturnWithPara = new NoReturnWithPara(DoNothing);
            }

            {
                //2.0 - 直接将一个匿名函数作为参数传给委托来创建实例 使用这种匿名函数的方式 避免了在类中定义一个仅仅用来创建委托的方法
                NoReturnWithPara noReturnWithPara = new NoReturnWithPara(delegate (int i, string s) { Console.WriteLine($"{i} {s}"); });
            }

            {
                //3.0及以后 使用了下面称为 Lambda expression的东西来代替了上面的匿名函数 类似于JS中的 arrow function
                //  Lambda Expression的本质是什么呢 --->就是一个匿名函数
                NoReturnWithPara noReturnWithPara = new NoReturnWithPara((int i, string s) =>{ Console.WriteLine($"{i} {s}");});

                //下面的代码 可以去掉参数前的类型 因为它是被用作NoReturnWithPara delegage的， 是个语法糖
                NoReturnWithPara noReturnWithPara1 = new NoReturnWithPara((i, s) => { Console.WriteLine($"{i} {s}"); });

                //可以继续简化 --- 只有一行的 方法可以去掉大括号
                NoReturnWithPara noReturnWithPara2 = new NoReturnWithPara((i, s) => Console.WriteLine($"{i} {s}"));

                //再简化 --- 直接用一个方法赋给委托的变量
                NoReturnWithPara noReturnWithPara3 = (i, s) => Console.WriteLine($"{i} {s}");

                //8.1 回顾一下 从1.0 到上面的语法 越来越简单 但是背后的原理 是一样
            }

        }

        /// <summary>
        /// 8.3 - 介绍 C#.Net Framework 3.0 引入的Action 和 Func
        /// </summary>
        public void ActionAndFunc()
        {
            {
                Action act1 = () => Console.WriteLine("Hello World") ;
            }

            {
                //Generic类型的 Action 委托
                Action<string> act2 = s=> Console.WriteLine(s);
                act2("sss");
                //框架最多支持Action 有16个参数
                Action<string, int, int, int, int, int, int, string, double, long, DateTime, string, long, string, DateTime, long> act3 = null;

            }

            {
                //Func<int> 是无参 但是有一个int返回值的委托类型
                Func<int> func1 = () => { return 1; };
                //如果方法体只有一行 可以去掉return 不需要大括号
                Func<int> func2 = () => 1;

                //下面的是 一个整形输入参数 返回一个string的值
                Func<int, string> func3 = (i) => i.ToString();

                //类似于上面的 Action, 框架最多支持Func 有16个参数
                Func<string, int, int, int, int, int, int, string, double, long, DateTime, string, long, string, DateTime, long> func16 = null;
                
            }

            //8.3.1 思考下 上述Action 和 Func的好处是什么 --> Framework框架帮我们定义了从无参无返回值 到有参有返回值的委托 我们不需要再声明委托了 有需要 直接用就行了
            {
                //除了上面可以直接使用 还有一个好处 --  统一: 避免了自己定义的各种delegate 虽然它们都是无参无返回值的 但是不能通用。如果统一使用了Action 那就可以通用了 
                //来看下面的例子 - DoAction方法接受一个无参无返回值的Action对象 可以像下面一样调用
                Action act1 = () => Console.WriteLine("Hello World");
                DoAction(act1);
                //那能不能将我们自己定义的 同样是无参无返回值的 NoReturnNoParam 对象传给DoAction()方法呢？
                NoReturnNoParam noReturnNoParam = new NoReturnNoParam(DoNothing); // or
                NoReturnNoParam noReturnNoParam1 = DoNothing;
                //实践证明是不可以的 -- 思考为什么? (Action和NoReturnNoParam 都是类 DoAction方法的参数必须是 Action类型的)
                //DoAction(noReturnNoParam);

            }
        }

        private void DoAction(Action action)
        {
            action();
        }
        private void DoNothing() { }
        private void DoNothing(int i , string s) { Console.WriteLine($"{i} {s}"); }
    }
}
