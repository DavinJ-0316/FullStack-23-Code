using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    /// <summary>
    /// 当使用泛型类作为基类的时候 必须指定泛型的类型 -例如下面的GenericClass<T> 的T就必须指定为 int      
    /// </summary>
    public class CommonClass : GenericClass<int>
    {
    }

    /// 除非你的子类也是一个泛型类 --> 下面表示CommonClass也是一个泛型类，基类GenericClass的类型通过子类来决定
    public class CommonClassT<T> : GenericClass<T> { }
    
    //注意 - 下面的Employee, Course 并不是我们定义的 Employee Class, Course Class.
    //当按F12 它们并不能定位到 definition, 它们仅仅是一个占位符 - 类似于 T U V
    //所以它们仅仅是用来表明自己是一个继承于泛型类的 泛型类 如下面的 Common1Class<T>
    public class Common1Class<T> : GenericClass<T> 
    {        
        //如果不利用base class的构造函数 可以自己定义如下 来设置 _T的值
        //public Common1Class(T t) { _T = t; }
        //利用调用基类的构造函数来设置继承的 公共属性_T的值
        public Common1Class(T t):base(t) { }
    }

    public class Common2Class<Employee> : GenericClass<Employee> { }


    //下面的CommonClass 表示自己是一个泛型类 但是它们是继承了已经明确了类型为int的泛型类 GenericClass
    public class Common3Class<Course> : GenericClass<int> 
    {
        public Course GetValueInCommon3Class(Course c) 
        {
            return c;
        }
    }

    public class Common4Class<T> : GenericClass<int> {}
    public class Common5Class<Employee> : GenericClass<int> { }
}
