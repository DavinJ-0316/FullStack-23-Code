using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    /// <summary>
    /// 1. 什么是泛型  - 泛型的引入是从.Net 2.0开始 延迟声明类型
    /// 2. 如何使用泛型
    /// 3. 泛型的好处和原理
    /// 4. 介绍泛型类 泛型方法 泛型接口 泛型委托
    /// 5. 泛型约束
    /// 6. 选修 协变和逆变
    /// 
    /// </summary>
    public class GenericLearning
    {
        #region 在泛型出来之前的场景
        //1.1 在泛型出现之前的 .Net1.0时代 
        //1.2 如果有需求 - 针对不同的类型 做相同的事(例如 打印一些信息) 就需要定义多个方法来支持不同的参数及类型
        //1.3 如果想要避免一些代码的重复 可以使用同一个方法ShowObject - 这个方法利用了C#语言中的一个公认的常识 ： object是所有类型基类 包括值类型
        public void ShowInt(int parameter)
        {
            Console.WriteLine(
                $"This is {typeof(GenericLearning)}, parameter = {parameter.GetType().Name}, type = {parameter.ToString()}");
        }

        public void ShowString(string parameter)
        {
            Console.WriteLine(
                $"This is {typeof(GenericLearning)}, parameter = {parameter.GetType().Name}, type = {parameter.ToString()}");
        }

        public void ShowDateTime(DateTime parameter)
        {
            Console.WriteLine(
                $"This is {typeof(GenericLearning)}, parameter = {parameter.GetType().Name}, type = {parameter.ToString()}");
        }

        public void ShowEmployee(Employee employee)
        {
            Console.WriteLine(
                $"This is {typeof(GenericLearning)}, parameter = {employee.GetType().Name}, type = {employee.ToString()}");

        }

        //1.3 利用Object作为参数
        public void ShowObj(object parameter)
        {
            Console.WriteLine(
                $"This is {typeof(GenericLearning)}, parameter = {parameter.GetType().Name}, type = {parameter.ToString()}");
        }
        #endregion

        #region 利用了泛型 - 初识泛型方法
        //2.1 什么是泛型 - 看一个简单例子：在方法名中加一个T(占位符), 参数parameter类型 就是 T类型
        //2.1.1 这里的T 可以是任意的Letter/word,但是避免使用C#关键字 和已经定义的类名  (by convension 使用单个字母T U V等等)
        public void Show<T>(T parameter)
        {
            Console.WriteLine($"This is {typeof(GenericLearning)}, parameter = {parameter.GetType().Name}, type = {parameter.ToString()}");
        }
        #endregion

        #region 3.泛型的原理 - 通过ILSpy 来认识占位符
        //3.1 以前的声明多个方法 一个类型对应一个方法 一个萝卜一个坑
        //    使用object类型是利用了C#的Object是所有类的基类 缺点是存在装箱 拆箱 int->object object->int 有性能的损耗
        //3.2 使用泛型没有定死参数类型 灵活 在调用方法的时候才指定哪种类型 --》延迟声明
        //3.3 不是一个语法糖 而是通过框架CLR支持的
        public void ShowGenericType()
        {
            Console.WriteLine($"Type of Generic List: {typeof(List<>)}");
            Console.WriteLine($"Type of Geenric dictionary: {typeof(Dictionary<,>)}");
        }
        //3.4 测试一下泛型方法的性能 - 性能优 灵活支持不同的类型 正是因为升级了 Compiler + CLR/JIT
        /// <summary>
        /// 测试泛型方法的运行速度
        /// </summary>
        public void MonitorGenericPerformance()
        {
            long seconds = 0;

            {
                Stopwatch stopwatch = Stopwatch.StartNew();
                stopwatch.Start();
                for (int i = 0; i < 100000000; i++)
                {
                    ShowInt(i);
                }

                stopwatch.Stop();
                seconds = stopwatch.ElapsedMilliseconds;

                Console.WriteLine($"ShowInt takes {seconds}");
            }

            {
                Stopwatch stopwatch = Stopwatch.StartNew();
                stopwatch.Start();
                for (int i = 0; i < 100000000; i++)
                {
                    ShowObj(i);
                }

                stopwatch.Stop();
                seconds = stopwatch.ElapsedMilliseconds;
                Console.WriteLine($"ShowObj takes {seconds}");
            }

            {
                Stopwatch stopwatch = Stopwatch.StartNew();
                stopwatch.Start();
                for (int i = 0; i < 100000000; i++)
                {
                    Show<int>(i);
                }

                stopwatch.Stop();
                seconds = stopwatch.ElapsedMilliseconds;
                Console.WriteLine($"ShowGeneric takes {seconds}");
            }
        }
        #endregion

        #region 4. 由泛型方法扩展到 泛型类和泛型接口
        //4.1 泛型类的例子 List<int> List<string> - 满足不同的集合类型
        //4.2 自定义泛型类型 - 类 接口
        public void OtherGenericTypes()
        {
            GenericClass<int> genericClass = new Generic.GenericClass<int>(10);
            GenericClass<int, string, long, bool> genericClass1 = new GenericClass<int, string, long, bool>();

            IGenericInterface<int> genericInterface = new CustomClass<int>();
            genericInterface.DisplayValue(10);
            int t = genericInterface.DisplayAndReturnValue(10);
        }
        //4.3 泛型类能作为基类被继承吗? - 可以作为基类被继承
        public void GenericInheritance()
        {
            //在下面的例子中, Common1Class<T>继承于泛型基类GenericClass<T>,并且在实例化的时候确定T的类型是string
            Common1Class<string> common1Class = new Common1Class<string>("Hello World");
            common1Class.GetValue();

            //与上面相比较
            //1. Common3Class<Employee>也是一个泛型类, 但是它继承于一个已经确定了类型的GenericClass<int> 也就是说它的基类不是泛型类
            //2. 通过F12, 可以看到Common3Class<Employee>是Common3Class<Course>类型
            //   这里不要混淆 Employee和Course - Employee是我们定义的Employee class, 而Common3Class<Course>是一个泛型类, 只不过它的占位符 (名字取得不好) 叫做Course
            Common3Class<Employee> t = new Common3Class<Employee>();
            //3. t.GetValue()是继承与 GenericClass<int>的方法
            t.GetValue();
            //   t.GetValueInCommon3Class 方法是自己本身的一个泛型方法
            t.GetValueInCommon3Class(new Employee("Jack Ma", 1));
            //   我们可以使用下面的例子 实例化另一个 泛型类实例 一个 Employee = string类型的对象 来证明Course仅仅是一个占位符
            Common3Class<string> t1 = new Common3Class<string>();
            t1.GetValueInCommon3Class("Hello world");
        }

        #endregion

        #region 5.泛型约束 - 来限制类型参数必须满足的条件 如果约束不通过 会编译错误
        //5.0 - 没有约束的泛型方法 实际用处有限
        public void TestGenericConstraint() 
        {
            FeatureHandyman chinesePeople = new ChinesePeople();
            GenericConstraint genericConstraint = new GenericConstraint();
            genericConstraint.TestWithoutConstraint<FeatureHandyman>(chinesePeople);

            //5.0.1 使用了约束的泛型方法
            genericConstraint.TestWithConstraint<FeatureHandyman>(chinesePeople);

            //5.0.2 但是下面的用法就报错 因为JapanPeople 没有继承 BasePeople

            JapanPeople japanesePeople = new JapanPeople();
            //genericConstraint.TestWithConstraint<BasePeople>(japanesePeople);

            //5.0.3 多约束 - japanesePeople没有继承自BasePeople类 所以不能调用下面的方法
            //genericConstraint.TestWithMultipleConstraint(japanesePeople);
            //而 GermanPeople既继承了BasePeople类 又实现了接口 所以它可以调用
            GermanPeople germanPeople = new GermanPeople();
            genericConstraint.TestWithMultipleConstraint(germanPeople);
        }
        //5.1 泛型约束的几种形式 - 
        //    5.1.1 基类约束 类型T必须继承自某个基类
        //    5.1.2 接口约束 类型T必须实现某个接口
        //    5.1.3 默认构造函数约束 类型T必须定义一个默认构造函数
        //    5.1.4 值类型/引用类型约束 struct/class 类型T要么是一个值类型 要么是一个引用类型 但是不能通过 值类型int来约束 以为约束的类型不能是sealed的
        /// <summary>
        /// 单约束
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public class EmployeeBaseList<T> where T : class
        {

        }
        public class StructList<T> where T : struct
        {

        }

        /// <summary>
        /// 多约束
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public class EmployeeList<T> where T : Employee, IDisposable, new()
        {

        }
        /// <summary>
        /// 多参数约束
        /// </summary>
        class Base { }
        class Test<T, U>
            where U : struct
            where T : Base, new()
        {
            private U u;
            private T t;
        }

        class TestWithGeneric<T, U, M, N, Z>
            where T : class
            where U : struct
            where M : class
            where N : struct
            where Z : struct
        { }
        //5.2 提出问题 - 可不可以通过基类达到上面的基类约束的效果? 如果可以不就不需要泛型约束了吗? 答案是 约束可以支持多个约束条件(例如既是 基类约束 又是接口约束)  更加灵活
        #endregion

        #region 6. 提高部分: 泛型的协变Covariance和逆变Contravariance
        //6.1 协变和逆变能够实现数组类型、委托类型和泛型类型参数的隐式引用转换
        //6.2 协变 逆变是通过在接口的泛型T 前面增加 out-协变 或者 in-逆变来实现的
        //6.2.1 理解协变和逆变 -- 
        //      变量customListOut 和 customListIn 他们的类型是根据左边的申明的 即变量customListOut 类型是ICustomListOut<Bird>
        //      customListIn 类型是ICustomListIn<Sparrow>. 右边的赋值是实际上的对象
        // 重要重要 ---->  当理解 逆变的时候, 方法只能接受左边接口的方法需要的类型 即 子类类型 而这个子类类型是可以传给右边实例对象的方法的 以为右边的对象方法类型是基类
        //6.3 只有泛型接口和泛型委托 才有协变和逆变, 泛型类没有

        #region 协变
        List<Bird> birds = new List<Bird>();

        //下面赋值不允许是因为  虽然 Sparrow is Bird, 但是 装Sparrow的 List -> List<Sparrow> 不是 List<Bird>
        //List<Bird> birds2 = new List<Sparrow>();

        //但是IEnumerable类型就可以, 因为IEnumerable的定义  使用了协变 out 返回值类型
        //public interface IEnumerable<out T> : IEnumerable
        IEnumerable<Bird> bird3 = new List<Sparrow>();

        ICustomListOut<Bird> customListOut = new CustomListOut<Sparrow>();
        public void TestCovariance()
        {
           var s = customListOut.Show();
        }
        #endregion

        #region 逆变
        //C# 中的逆变 泛型接口 IComparer<T>、IComparable<T> 和 IEqualityComparer<T>
        //interface IComparer<in T>
        Sparrow sparrow = new Sparrow();
        ICustomListIn<Sparrow> customList = new CustomListIn<Sparrow>();

        //Bird 实例不能赋给子类类型的对象
        //Sparrow sparrow2 = new Bird();

        //但是通过逆变, 可以 将类型参数的值 设置为基类
        //理解: 因为这里 Sparrow 和 Bird 是一个输入参数input，左边定义的是 Sparrow类型的CustomList,意味着在调用接口方法时 需要确保参数的类型必须是sparrow类型的
        //右边如果是基类的CustomList, 这个sparrow类型的参数也能被 接口方法(参数类型时基类)接受
        //通过设置断点 看到在运行时 customList2的类型时 泛型类型参数 T 为Bird的, 那么它的Show方法按理只能允许参数类型为 T=Bird, 但是传入的new Sparrow()也可以
        //这就是逆变的作用
        ICustomListIn<Sparrow> customListIn = new CustomListIn<Bird>();

        //为什么呢，看看下面方法的执行, customList2对象的Show 方法需要一个 Sparrow的类型的参数
        //当给他赋值new CustomList<Bird>()的时候，该对象的Show方法 允许传入Bird类型的参数
        //所以执行下面方法的时候, new Sparrow() 将被 转换成 它的基类Bird 这是允许的
        public void ShowMethod()
        {
            customListIn.Show(new Sparrow());            
        }

        IPeople people = new ChinesePeople();
        IPeople<Bird> people2 = new ChinesePeople<Bird>();

        //没有声明协变 逆变 下面的泛型转换都是不允许的
        //IPeople<Bird> people3 = new ChinesePeople<Sparrow>();
        //IPeople<Sparrow> people4 = new ChinesePeople<Bird>();

        //类型完全匹配 没有协变逆变
        IInOutCustomList<Sparrow, ChinesePeople> inOutCustomList = new InOutCustomList<Sparrow, ChinesePeople>();
        //out 类型 返回 ChinesePeople类型 --->协变
        IInOutCustomList<Sparrow, FeatureHandyman> inOutCustomList1 = new InOutCustomList<Sparrow, ChinesePeople>();
        public void Demo_12323()
        {
            Console.WriteLine($"{inOutCustomList1.GetType().FullName}");
            var t = inOutCustomList1.Get(new Sparrow());
            Console.WriteLine($"{t.GetType().FullName}");
        }
        //in 类型 接受 Sparrow类型 --->逆变
        IInOutCustomList<Sparrow, FeatureHandyman> inOutCustomList2 = new InOutCustomList<Bird, FeatureHandyman>();
        public void Demo_987987()
        {
            Console.WriteLine($"{inOutCustomList2.GetType().FullName}");
            var t = inOutCustomList2.Get(new Sparrow());
            Console.WriteLine($"{t.GetType().FullName}");
        }

        #region 通过委托认识协变 逆变
        //Func委托定义了out 协变 (返回值可以赋给父类对象)和 in 逆变(参数接受子类对象)
        Func<int, string> delFunc;
        Func<object, string> delParent;
       
        static string Func1(int i)
        {
            return "";
        }

        static string Func2(object o)
        {
            return "";
        }

        void Demo()
        {
            delFunc = Func1;                        
            //常规调用 没有协变逆变
            string s = delFunc(1);
            //有协变发生 - 返回值付给了object类型的对象
            object o = delFunc(2);
            
            delParent = Func2;
            //有逆变发生 - 参数1是整形 赋值给了object的类型参数
            string t = delParent(1);
            //既有协变 又有逆变
            object l = delParent(1);

        }
        #endregion


        #endregion
        #endregion

        #region 7.介绍一下泛型类的缓存
        //7.1 对每一个不同类型的泛型类 系统都自动生成一个新的类型 所以定义在这些新类型中的静态static属性 首先不同类是各不相同的 其次 相同类只有一个副本(实现了缓存)
        public class GenericCache<T>
        {
            public GenericCache()
            {
                Console.WriteLine($"This is GenericCache constructor");
            }

            private static string _TypeName = string.Empty;

            public static string GetCache()
            {
                return _TypeName;
            }
        }
        #endregion
    }
}
