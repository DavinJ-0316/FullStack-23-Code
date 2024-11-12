using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.AttributeBasic
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ComparableAttribute : Attribute
    {
        private string _tablename;
        private Type _type;
        public string TableName => _tablename;
        public Type ColumnType => _type;
        public ComparableAttribute(Type t, string tableName = "")
        {
            _type = t;
            _tablename = string.IsNullOrEmpty(tableName) ? "Booking" : tableName;
        }
    }

    internal static class ObjectCompareExtension
    {
        public static IList<Variance> DetailedCompare<T>(this T val1, T val2)
        {
            IList<Variance> variances = new List<Variance>();
            var s = val1.GetType();
            PropertyInfo[] fi = s.GetProperties();
            foreach (PropertyInfo f in fi)
            {
                var comparableAttr = f.GetCustomAttribute(typeof(ComparableAttribute));
                if (comparableAttr != null)
                {
                    Variance v = new Variance();
                    v.Prop = f.Name;
                    v.NewValue = f.GetValue(val1);
                    v.OldValue = f.GetValue(val2);
                    if (!Equals(v.NewValue, v.OldValue))
                    {
                        v.TableName = (comparableAttr as ComparableAttribute).TableName;
                        v.ColumnType = (comparableAttr as ComparableAttribute).ColumnType;
                        variances.Add(v);
                    }
                }

            }
            return variances;
        }
    }

    public class Variance
    {
        public Type ColumnType { get; set; }
        public string TableName { get; set; }
        public string Prop { get; set; }
        public object NewValue { get; set; }
        public object OldValue { get; set; }
    }
}
