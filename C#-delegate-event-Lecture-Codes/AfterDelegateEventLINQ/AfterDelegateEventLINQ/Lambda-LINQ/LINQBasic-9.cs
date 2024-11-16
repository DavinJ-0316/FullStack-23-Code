using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ.Lambda_LINQ
{
    /// <summary>
    /// 9. LINQ to Object => 根据微软的定义 the use of LINQ queries with any IEnumerable or IEnumerable<T> collection directly
    /// 使用LINQ 语法直接查询 IEmerable类型(或者泛型类型的)数据
    /// </summary>
    public static class LINQBasic
    {
        public static void Show()
        {
            List<int> intList = new List<int>() { 21,3,45,4,56,67,2323,43,6,32,44,454,7768,232,15};

            #region 9.1 初识 LINQ, 和普通的遍历方法的比较
            {
                //9.1 找出其中 大于100的数字

                List<int> result = new List<int>();
                //9.1.1. 使用遍历的方法
                foreach (int i in intList)
                {
                    if (i > 100)
                    {
                        result.Add(i);
                    }
                }

                //9.1.2. LINQ 的 Lambda表达式方法 - 代码少 简洁
                var list = intList.Where(x => x > 100);
            }
            #endregion

            #region 9.2 再有一个需求 找出 小于80的数
            {
                //9.2.1 同样的 复制粘贴 上面的代码 简单的修改一下判断条件 
                //      思考下 随着过滤条件的增多和不同 是不是会有很多下面的重复代码呢 
                //      9.2.1.1 第一步 将重复的代码写成一个方法 方法接受什么呢?
                List<int> result = new List<int>();                
                foreach (int i in intList)
                {
                    if (i < 80)
                    {
                        result.Add(i);
                    }
                }

                var list = intList.Where(x => x < 80);
            }
            #endregion
        }

        /// <summary>
        /// 9.2.1.1 第一步 将重复的代码移出来 形成一个方法的雏形 
        ///         但是很明显 我们有什么问题 --- 过滤条件现在是 <100 那以后有 >80, <60, >10 等等等 随着不同条件的增加 下面的方法显然不能满足需求
        /// </summary>
        /// <param name="inputList"></param>
        /// <returns></returns>
        public static List<int> CustomWhere_V1(List<int> inputList)
        {
            List<int> result = new List<int>();
            foreach (int i in inputList)
            {
                if (i < 100)
                {
                    result.Add(i);
                }
            }

            return result;
        }

        //9.2.1.2 - 有没有人想通过新增一个 参数 来决定使用哪种过滤条件? - 这种方式也是我们应该避免的, 思考下 这种方式的缺点 (当有新的过滤条件 我们就要修改这个方法 显然不是一个好的方案)
        public static List<int> CustomWhere_V2(List<int> inputList, int type)
        {
            List<int> result = new List<int>();
            foreach (int i in inputList)
            {
                if (type == 1)
                {
                    if (i < 100)
                    {
                        result.Add(i);
                    }
                }
                else if(type == 2)
                {
                    if (i >80)
                    {
                        result.Add(i);
                    }
                }
                //......其他过滤条件
            }

            return result;
        }

        //9.2.1.3 - 这时候我们应该能联想到 委托的应用 直接将 过滤的条件(逻辑) 作为参数传进来
        public static List<int> CustomWhere_V3(List<int> inputList, Func<int, bool> func)
        {
            List<int> result = new List<int>();
            foreach (int i in inputList)
            {
                if (func(i))
                {
                    result.Add(i);
                }
            }

            return result;
        }

        public static List<int> CustomWhere(this List<int> inputList, Func<int, bool> func)
        {
            List<int> result = new List<int>();
            foreach (int i in inputList)
            {
                if (func(i))
                {
                    result.Add(i);
                }
            }

            return result;
        }

        public static void ApplyCustomWhere_V3()
        {
            List<int> intList = new List<int>() { 21, 3, 45, 4, 56, 67, 2323, 43, 6, 32, 44, 454, 7768, 232, 15 };
            Func<int, bool> func = new Func<int, bool>(i=>i>100);
            //更加简洁的写法 func = i => i > 100;

            var result = CustomWhere_V3(intList, func);
            //跟上面的 9.1.2 相呼应 ---> LINQ就是做了我们上面的相同的事情, 大家比较一下 上面的 CustomWhere_V3(intList, func) 跟 lINQ的Where(x => x > 100) 是不是很类似
            // 如果要完全相像 在 CustomWhere_V3方法的第一个参数前加一个 this:CustomWhere_V3(this List<int> inputList, Func<int, bool> func)

            //定义List<int>的扩展方法 这就跟下面的 LINQ where一样的了吧
            //intList.CustomWhere(x=>x>100);


            var list = intList.Where(x => x > 100);

            //所以说LINQ 它就是将委托实例(过滤的具体逻辑)传给方法 这里的方法可以是 where, 也可以是其他的操作 像 sum max min orderby select ......
            //LINQ 是 .Net Framework 3.0的最有特色的特点之一 它的本质就是 提供一种方式方法 将共同的部分 抽象出来， 然后支持特性部分的定制封装
            // 这种思想的引入 真的是一种进步 

            // 上面都是 LINQ to Objects - 针对的是内存中的数据
            // 还有 LINQ to SQL - 对数据库的数据进行操作 虽然后面的实际内容不一样 我们在EF课程再讲 但是 LINQ查询的语言语法是一样的

            //发散思维一下 还有 LINQ to XML,查询 XML结构的数据 
            // LINQ to JSON/LINQ to Excel/LINQ to All - 他们的本质都是将查询语法统一 是框架封装思想的体现 

        }
    }
}
