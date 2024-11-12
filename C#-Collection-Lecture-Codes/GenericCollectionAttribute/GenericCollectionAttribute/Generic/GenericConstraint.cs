using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    public class GenericConstraint
    {
        /// <summary>
        /// 没有约束的泛型方法 不同的参数都可以进来 所以实际用处有限
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        public void TestWithoutConstraint<T>(T t)
        {
            //没有约束的泛型方法 因为不知道 T到底是什么类型 所以它在方法中没有实际的用处 只能看到作为object的方法
            Console.WriteLine($"{t.GetType().FullName} {t.ToString()}");

            //没有办法访问如下的属性
            //Console.WriteLine($"{t.Id} {t.Name}");
        }

        /// <summary>
        /// 有了约束的泛型方法 可以访问泛型约束的基类的方法和属性
        /// 有了约束 就有了使用的权利
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        public void TestWithConstraint<T>(T t) where T : FeatureHandyman
        {
            Console.WriteLine($"{t.Id} {t.Name}");
            t.Show();
        }

        /// <summary>
        /// 多约束 - 类型T 必须满足 既是BasePeople 又实现了 ISport接口
        /// 它既可以调用BasePeople的方法属性 又可以调用ISport的方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        public void TestWithMultipleConstraint<T>(T t) where T:FeatureHandyman, ISport
        {
            Console.WriteLine($"{t.Id} {t.Name}");
            t.Show();
            t.PlayFootball();
        }
    }
}
