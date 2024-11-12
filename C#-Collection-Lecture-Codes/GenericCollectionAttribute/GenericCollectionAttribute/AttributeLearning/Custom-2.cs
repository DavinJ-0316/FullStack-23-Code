using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    /// <summary>
    /// 2. 自定义的特性  --  都是直接或者间接继承于 Attrubute
    /// 2.1  以Attribute结尾(这个是convension 惯例 所以一般都遵守)
    /// 2.2  通常会应用另一个特性AttributeUsageAttribute - 来规定自定义的特性使用在哪些地方, F12 看看有哪些AttributeTargets
    /// 2.3  在Booking class中我们应用的这个CustomAttribute 那么它有什么作用呢? 通过在代码中new 一个Booking对象 调用其方法 好像Custom特性没有什么作用
    /// 2.4  特性 我们说它应该是影响了 编译器, 像内置的 序列化特性 Obsolete特性 都能看到效果 但是我们自定义的特性在使用中貌似没有直接感受到 - 为什么呢?那我们自定义了这个特性有啥用呢?
    ///     2.4.1 通过反编译ILSpy看下编译后的结果 看看自定义的特性产生什么输出 (看到添加了custom特性的类 属性和方法 编译器自动添加了custom特性的代码 但是这些代码我们在调用class方法 或者实例化对象的时候是看不到的)
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method | AttributeTargets.Property | AttributeTargets.Parameter | AttributeTargets.ReturnValue, AllowMultiple = true)]
    public class CustomAttribute : Attribute
    {
        public CustomAttribute() { }
        public CustomAttribute(string name) { }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Remark = null;
        public string Show()
        {
            return $"CustomAttribute {Name}";
        }
    }
}
