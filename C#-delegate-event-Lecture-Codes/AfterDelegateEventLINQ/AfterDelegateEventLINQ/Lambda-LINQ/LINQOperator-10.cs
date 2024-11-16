using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AfterDelegateEventLINQ.Lambda_LINQ
{
    /// <summary>
    /// LINQ有两种写法 Method syntax 和 query expression 查询表达式. 在前面我们用的都是扩展方法语法 下面我们看一下 表达式方式(非常类似与 SQL 命令)
    /// 下面就来介绍常用的 LINQ 操作符 有 
    ///     过滤filter 连接Join Projection(可以用来自定义返回数据结构) 
    ///     排序操作符order grouping分组操作符 结合体操作符aggregation(例如常见的max min count sum)
    /// </summary>
    public class LINQOperator_10
    {
        //10.1 - where condition 查找单词长度等于3 的单词
        public void FilteringOperator()
        {
            string[] words = { "humpty", "dumpty", "set", "on", "a", "wall" };

            IEnumerable<string> query = from word in words where word.Length == 3 select word;

            foreach (string str in query) Console.WriteLine(str);
            Console.ReadLine();
        }

        //10.2 - inner join 关联操作符 两个数据源的关联 查找 员工列表 和部门列表的交集 或者说 查找员工及其所在部门
        //       如果部门没有员工 那就不会返回该部门。 提一提 还有left join / right join 
        public void JoiningOperator()
        {
            List<DepartmentClass> departments = new List<DepartmentClass>();
            departments.Add(new DepartmentClass { DepartmentId = 1, Name = "Account" });
            departments.Add(new DepartmentClass { DepartmentId = 2, Name = "Sales" });
            departments.Add(new DepartmentClass { DepartmentId = 3, Name = "Marketing" });

            List<EmployeeClass> employees = new List<EmployeeClass>();
            employees.Add(new EmployeeClass { DepartmentId = 1, EmployeeId = 1, EmployeeName = "William" });
            employees.Add(new EmployeeClass { DepartmentId = 2, EmployeeId = 2, EmployeeName = "Miley" });
            employees.Add(new EmployeeClass { DepartmentId = 1, EmployeeId = 3, EmployeeName = "Benjamin" });


            var list = (from e in employees
                        join d in departments on e.DepartmentId equals d.DepartmentId
                        select new
                        {
                            EmployeeName = e.EmployeeName,
                            DepartmentName = d.Name
                        });

            foreach (var e in list)
            {
                Console.WriteLine("Employee Name = {0} , Department Name = {1}", e.EmployeeName, e.DepartmentName);
            }

            Console.WriteLine("\nPress any key to continue.");
            Console.ReadKey();
        }

        //10.3 - Select vs SelectMany

        //select - 为每个数据源 生成对应的结果 所以总体结果数量跟源数据的数量一致
        //selectMany - 生成单一的平铺结果 其中包含来自每个源值的子集合 selectMany方法接受的第一个参数叫做 转换函数 
        //看下代码 示例
        public void Select_Many_Test()
        {
            var initList = new List<Select>();
            initList.Add(new Select("s1", "s2"));
            initList.Add(new Select("t1", "t2"));
            initList.Add(new Select("u1", "u2"));

            var firstList = initList.Select(x => x.Attrs).ToList();
            var secondList = initList.SelectMany(x => x.Attrs).ToList();

        }

        //10.4 - SelectMany 再深入一点 (如果有机会讲 - 如果听众没有太困惑)
        public void CombinationMatchingEvetyItem()
        {
            List<string> phrases = ["an apple a day", "the quick brown fox", "the third phase"];
            List<int> numbers = [1, 2, 3, 4];

            var query = from number in numbers
                        from phrase in phrases
                        select (number, phrase);
            //10.4.1 相当于 循环嵌套 对每个数字 (1,2,3,4),都把Pharese里面的 句子打印一遍
            foreach (var item in query)
            {
                Console.WriteLine(item);
            }

            //下面的selectmany和上面的查询等价 - selectMany传入了两个 委托示例 也就是Func委托实例

            //selectMany的第一个参数为一个Func, 输入参数是number, 返回phrases => ["an apple a day", "the quick brown fox", "the third phase"]
            //关键的理解时 第一个Func的返回值 在SelectMany中会被再遍历一遍 (例如 如果返回的是 ["an apple a day", "the quick brown fox", "the third phase"], 会遍历每个字符串; 如果返回的是 “an apple a day”,会遍历每个char) 执行 第二个Func实例函数
            //selectMany的第二个参数是另一个Func,输入参数是两个(number, phrase)它负责最终构造要返回的combination结果
            var method = numbers
                .SelectMany(number => phrases,
                (number, phrase) => (number, $"{phrase}"));

            foreach (var item in method)
            {
                Console.WriteLine(item);
            }


            //下面的selectMany 重载函数增加了一个index, 即变量i => 指的是number2中的每个数字的基于0开始的索引值。
            //第一个参数Func, 输入参数有两个，一个是number (1,2,3), 另一个是对应的索引值(0,1,2).输出值是phrase2 字符串数组里对应索引的字符串("an apple a day", "the quick brown fox", "the third phase")
            //关键的理解时 第一个Func的返回值 在SelectMany中会被再遍历一遍 (例如 如果返回的是 ["an apple a day", "the quick brown fox", "the third phase"], 会遍历每个字符串; 如果返回的是 “an apple a day”,会遍历每个char) 执行 第二个Func实例函数
            //第二个参数Func, 输入参数也有两个，第一个同样是number(1,2,3),但是另一个是char类型， 即上面第一个Func的输出值的每个字符串的每一个字符char=>(a n  a p p l e ......)
            List<string> phrases2 = ["an apple a day", "the quick brown fox", "the third phase"];
            List<int> numbers2 = [1, 2, 3];

            var result = numbers2.SelectMany((n, i) => phrases2[i], (n, phrase) => $"{phrase} {n}");
            foreach (var s in result)
            {
                Console.WriteLine(s);
            }
        }

        //10.5 Order 排序 操作符
        public void OrderOperator()
        {
            int[] num = { -20, 12, 6, 10, 0, -3, 1 };

            //create a query that obtain the values in sorted order
            var posNums = from n in num
                          orderby n
                          select n;

            Console.Write("Values in ascending order: ");

            // Execute the query and display the results.

            foreach (int i in posNums)
                Console.Write(i + " \n");

            var posNumsDesc = from n in num
                              orderby n descending
                              select n;

            Console.Write("\nValues in descending order: ");
        }

        //10.6 分组操作符 group by
        public void GroupOperator()
        {
            List<int> numbers = new List<int>() { 35, 44, 200, 84, 3987, 4, 199, 329, 446, 208 };

            IEnumerable<IGrouping<int, int>> query = from number in numbers
                                                     group number by number % 2;

            foreach (var group in query)
            {
                Console.WriteLine(group.Key == 0 ? "\nEven numbers:" : "\nOdd numbers:");

                foreach (int i in group)
                    Console.WriteLine(i);
            }
        }

        //10.7 Aggregation 操作符
        public void AggregationOperator()
        {
            int[] num = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

            int intDivByTwo = (from n in num
                               where n > 6
                               select n).Count();
            Console.WriteLine("Count of Numbers: " + intDivByTwo);

            double intResult = (from n in num
                                where n > 6
                                select n).Average();

            Console.WriteLine("Average of Numbers: " + intResult);

            intResult = (from n in num
                         where n > 6
                         select n).LongCount();

            Console.WriteLine("Long Count of Numbers: " + intResult);

            intResult = num.Max();

            Console.WriteLine("Max of Numbers: " + intResult);

            intResult = num.Min();

            Console.WriteLine("Min of Numbers: " + intResult);

            intResult = num.Sum();

            Console.WriteLine("Sum of Numbers: " + intResult);
        }

        //10.8 Partition Operator
        public void PartitionOperator()
        {
            {
                string[] words = new[] { "once", "upon", "a", "time", "there", "was", "a", "jungle" };

                var query = words.Skip(4);

                var sb = new StringBuilder();

                foreach (string str in query)
                {
                    sb.AppendLine(str);
                    Console.WriteLine(str);
                }
            }

            {
                string[] words = new[] { "once", "upon", "a", "time", "there", "was", "a", "jungle" };

                var query = words.SkipWhile(word => word.Substring(0, 1) == "t");


                var sb = new StringBuilder();

                foreach (string str in query)
                {
                    sb.AppendLine(str);
                    Console.WriteLine(str);
                }
            }
            {
                string[] words = new[] { "once", "upon", "a", "time", "there", "was", "a", "jungle" };

                var query = words.Take(3);


                var sb = new StringBuilder();

                foreach (string str in query)
                {
                    sb.AppendLine(str);
                    Console.WriteLine(str);
                }
            }
        }

        class DepartmentClass
        {
            public int DepartmentId { get; set; }
            public string Name { get; set; }
        }

        class EmployeeClass
        {
            public int EmployeeId { get; set; }
            public string EmployeeName { get; set; }
            public int DepartmentId { get; set; }
        }

        class Select
        {
            public List<string> Attrs { get; set; } = new List<string>();
            public Select(params string[] str)
            {
                str?.ToList()?.ForEach(x => Attrs.Add(x));
            }
        }
    }
}
