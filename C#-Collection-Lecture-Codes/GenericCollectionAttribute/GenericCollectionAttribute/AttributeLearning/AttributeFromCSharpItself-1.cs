using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    //1. 特性通常和反射一起使用 通过反射技术来发挥作用 如果仅仅在程序中 申明了特性 它对程序的运行不会产生任何作用 
    //.Net 内置特性举例 -
    //  Obsolete - 表示类或者方法被弃用 或者不建议继续使用
    //  Serializable - 用来表明该类是否可以被序列化成binary或者XML格式, 如果需要将对象保存或者传输(例如 保存成文件 在网络以JSON或者XMAL格式传输)
    //  JsonIgnore - 表示在序列化时忽略该属性
    //  HttpGet/HttpPost - 用来标识 方法支持哪种Http 请求类型, Get通常是 以只读方式获取数据 Post一般是新增数据 一般用来向数据库insert数据 或者修改数据
    //  MVC 中的Filter, Authentication/Authorization
    //  DllImport - 调用 C++ COM 代码库
    //  更加频繁出现的是在EntityFramework里面 DataAnnotation包含的一组验证数据的特性 位于 DataAnnotation.Schema 命名空间的 包含将实体类 Entity映射到数据库表Table的特性. 例如
    //  Key / ForeignKey / Column(代表Entity的属性字段和表中哪个字段映射) / InverseProperty(关联属性) / Required / MinLength / MaxLength / NotMapped(表示Entity的属性与数据库中表字段没有映射关系)    
    [Serializable()]
    [Custom]
    [Custom("Name1")]
    [Custom("Name2", Description = "Description")]
    [Custom("Name2", Description = "Description"), Custom()] //但是不可以调用CustomAttribute的方法
    public class Booking
    {
        public int Id { get; set; }
        [Custom]
        [Comparable(typeof(string))]
        public string Name { get; set; }
        [Comparable(typeof(double))]
        public double Price { get; set; }
        public string Description { get; set; }

        [Custom]        
        public string Print()
        {
            return $"{Id} {Name} {Description} at ${Price}";
        }
        [Obsolete("The method will be obsoleted.", true)]
        public void SayHello([Custom] string s)
        {

        }

        /// <summary>
        /// 2.5 下面的示例给方法的参数和返回值加了特性 
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        [Custom()]
        [return: Custom]
        public string NormalPrint([Custom] string s)
        {
            //1.1 下面的调用如果Obsolete没有 第二个参数 true 将会出现warning
            //    如果在Obsolete特性中明确了第二个参数为true 下面的调用将会编译出错 
            //    这个就是开发者决定是否 disable或者继续支持 即将舍弃的方法， 一般情况下 会给出warning 而不是error, 以达到向前兼容的目的
            //SayHello("");
            return s;
        }
    }

    //1.2 通过F12 查看C#内置的特性来看看 特性就是一个类 它继承与Attribute, 它可以被使用的地方AttributeUsage - 类 委托 结构 方法 输入输出参数 属性 
    //特性和注释
    //如果仅仅声明特性, 应用到class或者其他目标，特性不发挥任何作用
    //要想特性起作用，要使用反射获取class的元数据，并判断是否存在 特性及其属性 来决定进行的操作
}
