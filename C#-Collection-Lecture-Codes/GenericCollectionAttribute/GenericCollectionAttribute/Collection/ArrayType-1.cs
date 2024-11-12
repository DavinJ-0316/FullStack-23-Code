using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Collection
{

    public class MyList<T> : IList<T>, IList
    {
        public object? this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        T IList<T>.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public bool IsFixedSize => throw new NotImplementedException();

        public bool IsReadOnly => throw new NotImplementedException();

        public int Count => throw new NotImplementedException();

        public bool IsSynchronized => throw new NotImplementedException();

        public object SyncRoot => throw new NotImplementedException();

        int IList.Add(object? value)
        {
            throw new NotImplementedException();
        }

        void ICollection<T>.Add(T item) { }

        public void Add(T item)
        {
            throw new NotImplementedException();
        }

        public void Clear()
        {
            throw new NotImplementedException();
        }

        public bool Contains(object? value)
        {
            throw new NotImplementedException();
        }

        public bool Contains(T item)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(T[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        public IEnumerator GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public int IndexOf(object? value)
        {
            throw new NotImplementedException();
        }

        public int IndexOf(T item)
        {
            throw new NotImplementedException();
        }

        public void Insert(int index, object? value)
        {
            throw new NotImplementedException();
        }

        public void Insert(int index, T item)
        {
            throw new NotImplementedException();
        }

        public void Remove(object? value)
        {
            throw new NotImplementedException();
        }

        public bool Remove(T item)
        {
            throw new NotImplementedException();
        }

        public void RemoveAt(int index)
        {
            throw new NotImplementedException();
        }

        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        
    }
    public class ArrayType
    {
        // 1. 顺序存储类型 有 Array, ArrayList, List, List<T>
        // 特点： 可通过索引下标访问 读取快 增删慢        

        public ArrayType() { }

        #region 1.1 数组定义必须定长 且类型一致
        //1.1.1 - 数组的几种定义方式 无论哪种 长度都是固定的
        private int[] ints = new int[10];
        private int[] ints2 = new int[] { 2, 3, 4, 5 };
        private int[] ints3 = [1, 2, 3, 4, 5];
        //1.1.2 - 不能越界赋值 
        public void ArrayShow()
        {
            ints[9] = 1;

            //1.1.2 - 下面的代码将抛出异常： System.IndexOutOfRangeException: 'Index was outside the bounds of the array.
            ints[10] = 2;
        }

        //1.1.3 - 解释一下 数组在内存中的分配方式；连续分配的方式 使得读取很快 但是删除 增加就比较慢
        //      根据其内存分配的方式 适合的场景就是 数据需要频繁读取但是很少修改的 情况下 适合使用数组方式存取
        #endregion

        #region 1.2 ArrayList - 针对数组的定长的特点 它支持不定长 在内存中也是连续分配
        //1.2.1 ArrayList没有长度限制
        //1.2.2 可以保持任何类型 - 所有类型都被装箱成object 所以有装箱操作
        private ArrayList arrayList = new ArrayList();
        public void ArrayListShow()
        {
            arrayList.Add(1);
            arrayList.Add("abc");
            arrayList.Add(new object());
            
            //1.2.3 ArrayList是没有长度限制的 可以一直使用.Add方法添加 但是访问不存在的索引 会报错 和Array类似 下面的代码也会报异常 - 超出长度
            arrayList[3] = 33;
            //1.2.4 当取值的时候 所有的存储的值都被当作 object 类型 这就是装箱操作(在保存时统一将数据类型转换成了object). 查看下面的t的类型。
            var t = arrayList[0];
            //1.2.5 你知道取回来的是一个整型数值 所以通过拆箱unboxing 来把它赋给一个整形变量
            int s = (int)t;
        }
        #endregion

        #region 1.3 泛型List: 上面的ArrayList解决了Array的定长局限 但是引入了类型不安全 装箱拆箱的性能损失. 那么有没有既不限制长度 又类型安全的数据类型呢
        //1.3.1 答案就是 泛型 List<T>, 在内存中也是连续存储的。能够通过索引下标访问
        //这就跟我们前面的泛型 相呼应上了
        //在实际开发工作中, 我们可能更多的使用List类型 没有使用 Array 和 ArrayList类型
        //类型安全 没有装箱拆箱               
        private List<string> stringList = new List<string>();
        public void StringListShow()
        {
            //1.3.2 访问不存在的索引 会跟上面一样抛出异常

            //var s = stringList[0];
            //stringList[0] = "s";

            stringList.Add("sss");
            List<int> intList = new List<int>();
            intList.Add(1);
            intList.Add(2);
            intList.Add(4);

            //1.3.3 删除可以根据值 也可以根据索引位置
            intList.RemoveAt(0);
            intList.Remove(2);

            //1.3.3 下面的删除操作 如果没有40这个数值 不会抛出异常
            intList.Remove(40);
        }
        #endregion
    }
}
