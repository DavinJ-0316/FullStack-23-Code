using GenericCollectionAttribute.AttributeBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    /// <summary>
    /// 3 下面的代码示例 演示 特性有什么用处 运行时 怎么通过 API 方法查找定义的特性
    /// </summary>
    internal class CustomAttributeManager
    {
        public static void Show(Booking b)
        {
            //3.1 利用反射来获取到 Booking 类的类型信息
            //3.1.1 访问特性的 基本流程 ---> 通过调用方法 type.IsDefined() 检查是否定义了 特性类型
            //      然后调用GetCustomAttribute() 来构造自定义特性的对象(不要忘记 custom attribute也是一个类)
            //      获得custom attribute的对象后就可以访问其 字段 属性 方法

            Type type = typeof(Booking); //b.GetType();
            if (type.IsDefined(typeof(CustomAttribute), true))
            {
                //3.2 为什么调用了GetCustomAttribute()方法就能够生成一个对象呢? --- 回忆一下通过ILSpy看到的代码 
                //    在 Booking class 上声明的CustomAttribute, 编译器自动生成的代码 已经将CustomnAttribute的构造函数 放在代码中了。所以下面的代码 就会调用已经生成好的Custom Attribute构造函数
                CustomAttribute oCustom = (CustomAttribute)type.GetCustomAttribute(typeof(CustomAttribute), true);

                Console.WriteLine($"{oCustom.Description} {oCustom.Remark} {oCustom.Name} {oCustom.Show()}");                
            }

            //3.3 下面的代码演示其他的方法来获得custom attribute的属性和方法
            PropertyInfo nameProperty = type.GetProperty("Name");
            if (nameProperty.IsDefined(typeof(CustomAttribute), true))
            {
                CustomAttribute customProperty = (CustomAttribute)nameProperty.GetCustomAttribute(typeof(CustomAttribute), true);
            }

            MethodInfo methodInfo = type.GetMethod("Print");
            if (methodInfo.IsDefined(typeof(CustomAttribute), true))
            {
                CustomAttribute customAttribute = (CustomAttribute)methodInfo.GetCustomAttribute(typeof(CustomAttribute), true);
            }

            //3.4 下面的代码演示如何获取添加在方法输入参数输出参数 前面的custom attribute
            ParameterInfo parameterInfo = methodInfo.GetParameters()[0];
            if(parameterInfo.IsDefined(typeof(CustomAttribute), true))
            {

            }
            ParameterInfo returnParameterInfo = methodInfo.ReturnParameter;
            if(returnParameterInfo.IsDefined(typeof(CustomAttribute), true))
            {

            }
        }

        public static void DisplayProcedureType()
        {
            ProcedureType selectedProcedureType = ProcedureType.Hip;
            //下面的方法 - 试图获取 自定义的特性 ProcedureTypeAttribute
            // 一旦获取到这个自定义特性的object,我们就可以获取定义的属性值
            ProcedureTypeAttribute selectedProcedureTypeAttr = selectedProcedureType.TryGetAttribute<ProcedureTypeAttribute>();

            var procedureType = selectedProcedureTypeAttr.ProcedureType;
            var description = selectedProcedureTypeAttr.Description;
        }
    }
}
