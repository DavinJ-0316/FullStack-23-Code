using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Collection
{
    /// <summary>
    /// 5. 解释一下 常用到的 接口 IList ICollection IEnumerable IQueryable
    /// </summary>
    public class ExplainCollectionInterfaces_5
    {
        //5.1 解释各个接口的差异
        IList<string> iList; // 支持下标访问的 实现该接口
        ICollection<string> iCollection; // 支持Add Remove方法的实现这个接口

         
        // 支持foreach 遍历的 - 为不同的数据结构提供了统一的数据访问方式 -- 迭代器模式
        IEnumerable<string> iEnumerable; 

        //5.2 解释IQueryable
        // 该接口实现了IEnumerable 并且一般用在数据查询的场景中 LINQ, DBQuery
        // 在结合LINQ 和数据库 Provider使用时，它将expression tree翻译成对应的 SQL Command 交由数据库执行
        // 所以他返回的是一个 "可查询的语言" 而不是直接的查询结果 例如 除非调用了.ToList() 它才调用IQueryProvider的Execute方法 返回(enumerable 可遍历的)执行结果
        // 通过F12查看IQueryable的 接口实现关系 IQueryable有一个 IQueryProvider 
        IQueryable<string> iQueryable; 

        public void TestCollectionInterface()
        {
            List<string> list = new List<string>() { "apple", "orange", "banana", "grape", "mango", "blueberry"};
            var query = list.Where(x=>x.Length >5);

            //5.3 下面的query - 延迟执行 并不是上面的语句立刻返回查询结果 通过F11可以看到 在下面每次遍历的时候 都去执行一下上面的 where Func 
            //    传给Where的是一个 委托 Func 
            //    遍历的时候 才会去查询比较  通过一个迭代器 yield的方式返回
            foreach (var item in query)
            {
                Console.WriteLine(item);
            }

            //5.4 下面的query 也是延迟执行  但是它传入的是一个 表达式目录树 通过F11 遍历时是不会进入这个Where的目录树的
            //    通过解析表达式目录树 延迟到遍历的时候才执行查询
            //    在使用到数据库的时候 它会产生数据库查询语句

            var query1 = list.AsQueryable<string>().Where(x => x.Length > 5);
            foreach(var item in query1)
            {
                Console.WriteLine(item);
            }

            # region 5.5  IQuerable<T>.Where()它的参数的类型 - Expression<Func<T,U>>
						//    IQuerable 和 IEnumerable 的 Where 方法，虽然名字相同 但是所需要的参数类型是不同的  
						//    C#编译器会自动根据Func<string, bool>委托(lambda 表达式) 来为我们生成表达式目录树 对象

						Expression<Func<string, bool>> lambda = s => s.Length > 5;
            list.AsQueryable().Where(lambda);

           
            //    更加详细的关于表达式目录树的内容 可以参见 https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/expression-trees/expression-trees-building
            //    例如下面的代码 为我们生成了一个简单的无参数的 ()=> 1+2 的 Lambda表达式
            var one = Expression.Constant(1, typeof(int));
            var two = Expression.Constant(2, typeof(int));
            var addition = Expression.Add(one, two);
            var lambda2 = Expression.Lambda(addition);

            //    如果有同学一定要尝试 传入Expression 表达式目录树对象给IQuerable.Where() 可以试试下面的代码 
            //    可以看到 编译器 为我们自动生成了很多的代码。短短的一行 s=>s.Length > 5, 对应了下面的多行代码
            ParameterExpression stringParam = Expression.Parameter(typeof(string), "value");
            MemberExpression lengthMember = Expression.Property(stringParam, "Length");
            ConstantExpression constantExpression = Expression.Constant(5, typeof(int));
            BinaryExpression lengthLessThan5 = Expression.GreaterThan(lengthMember, constantExpression);

            Expression<Func<string, bool>> lambda3 = Expression.Lambda<Func<string, bool>>(lengthLessThan5, new ParameterExpression[] {stringParam});
            //可以通过设置断点 看到下面的返回值跟上面的 一样
            var t = list.AsQueryable().Where(lambda3);
            string s = "";

						#endregion

				}
		}
}
