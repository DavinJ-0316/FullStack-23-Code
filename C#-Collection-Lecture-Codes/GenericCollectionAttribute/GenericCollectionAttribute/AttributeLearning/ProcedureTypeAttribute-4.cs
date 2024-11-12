using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    public enum NoUsed
    {
        Non,
        Used
    }
    /// <summary>
    /// 4. 定义下面的 枚举 来定义用户类别
    /// </summary>
    public enum UserState
    {
        //4.1 在实际应用中 有需求--> 下拉框 dropdownlist 供用户选择用户类型, 选择的选项 它的值是 0  1 2  但是显示的 Text 要是容易理解的Active/Inactive/Deleted(Removed)
        //这种情况下 怎么显示下面的注释的内容呢? -- 显然注释是不可能在代码中被应用的
        //在这种情况下就可以应用特性了
        /// <summary>
        /// Normal User
        /// </summary>
        [Remark("Active User")]
        Active =0,
        /// <summary>
        /// Inactive User
        /// </summary>
        [Remark("Inactive User")]
        Inactive = 1,
        /// <summary>
        /// Removed User
        /// </summary>
        [Remark("Removed User")]
        Deleted =2,

        //实验一下 没有使用RemarkAttribute
        NonUsed = 3


    }




    public class RemarkAttribute: Attribute
    {
        private string _remark = null;
        public RemarkAttribute(string remark) { _remark = remark; }
        public string Remark => _remark;

    }

    public static class RemarkExtension
    {
        /// <summary>
        /// 针对 UserState type的扩展方法
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetRemark2(this UserState value)
        {
            Type type = value.GetType();
            FieldInfo fieldInfo = type.GetField(value.ToString());
            if (fieldInfo != null && fieldInfo.IsDefined(typeof(RemarkAttribute)))
            {
                RemarkAttribute remarkAttribute = (RemarkAttribute)fieldInfo.GetCustomAttribute(typeof(RemarkAttribute), true);
                return remarkAttribute.Remark;
            }
            else
            {
                return value.ToString();
            }
        }

        /// <summary>
        /// 针对Enum 所有枚举类型的扩展方法
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetRemark(this Enum value)
        {
            Type type = value.GetType();
            FieldInfo fieldInfo = type.GetField(value.ToString());
            if (fieldInfo != null && fieldInfo.IsDefined(typeof(RemarkAttribute)))
            {
                RemarkAttribute remarkAttribute = (RemarkAttribute)fieldInfo.GetCustomAttribute(typeof(RemarkAttribute), true);
                return remarkAttribute.Remark;
            }
            else
            {
                return value.ToString();
            }
        }
    }

    public enum ProcedureType
    {
        [Display(Name = "Hip")]
        //这里只是简单的传入Hip
        //想象一下ProcedureTypeAttribute可以定义更多的属性,例如 description
        [ProcedureType("Hip")]
        Hip,

        [Display(Name = "Knee")]
        [ProcedureType("Knee")]
        Knee
    }    

    internal class ProcedureTypeAttribute : Attribute
    {
        internal ProcedureTypeAttribute(string procedureType)
        {
            ProcedureType = procedureType;
        }

        internal string ProcedureType { get; }
        internal string Description { get; set; }
    }
}
