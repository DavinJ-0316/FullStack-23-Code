using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    internal static class EnumExtensions_5
    {
        public static T TryGetAttribute<T>(this Enum enumer)
            where T : Attribute
        {
            T thisAtt = null;
            TryGetAttribute<T>(enumer, a => thisAtt = a);
            return thisAtt;
        }

        /// <summary>
        /// 在这个例子中，传入了一个Action委托实例，可以对获取到的Custom Attribute进行进一步的处理并按照需求返回所需要的值
        /// 这可以认为是一个更加灵活和custom的实现
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="enumer"></param>
        /// <param name="attProc"></param>
        /// <returns></returns>
        public static bool TryGetAttribute<T>(this Enum enumer, Action<T> attProc)
           where T : Attribute
        {
            #region 更多的可能性
            ProcedureTypeAttribute procedureTypeAttribute = enumer.TryGetAttribute<ProcedureTypeAttribute>();
            //可以获取定义在ProcedureTypeAttribute中的任意 custom property
            //procedureTypeAttribute.ProcedureType
            //procedureTypeAttribute.Description

            #endregion
            var enumType = enumer.GetType();
            var enumField = enumType.GetMember(enumer.ToString()).FirstOrDefault();
            var atts = enumField?.GetCustomAttributes(typeof(T), false);

            if (atts != null && atts.Any())
            {
                var att = atts.First() as T;
                attProc.Invoke(att);
                return true;
            }
            else
            {
                return false;
            }
        }
    }


}
