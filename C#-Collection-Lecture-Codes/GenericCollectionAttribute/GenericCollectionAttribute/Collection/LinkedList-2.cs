using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Collection
{
    /// <summary>
    /// 双向链表结构 - 解决顺序存储方式的 增删改 慢的问题
    /// </summary>
    public class LinkedList_2
    {
        #region 双向链表
        // 2. LinkedList<T> 在内存中非顺序存储 增删快，查找慢
        // 每个元素都记录前后节点 - LinkedListNode 类型
        // 2.1 能不能通过index下标访问 - Q: 理解一下为什么 - 因为它不是顺序 连续 存储的 所以不知道索引位置
        // var s = values[0];
        LinkedList<string> values = new LinkedList<string>();

        public void LinedListMethod()
        {
            //2.2 它就没有Add方法 因为不知道该增加到哪里 要告诉它你想增加到哪里 看看 一些主要方法 在头部 和尾部新增节点            
            values.AddFirst("sss");
            values.AddLast("bbb");

            
            //2.3 下面的方法直接返回保存的值
            var t = values.First();
            var t1 = values.First(x => x == "sss");

            //2.4 注意下面的First属性 Find方法 返回的是一个LinkedListNode类型的变量 它有previous和next指针指向前后的节点(这就是它被称为双向链表的原因)
            var foundNode = values.Find("sss");            
            var firstNode = values.First;

            //2.5 一些Add*方法 也有返回值 类型也是LinkedListNode
            var addedNode = values.AddFirst("1111");            
            LinkedListNode<string> t2 = values.AddLast("aaa");

            //2.6 上面的Add方法有另外一种形式的重载 直接传入一个LinkedListNode 变量 那就没有返回值了
            values.AddFirst(new LinkedListNode<string>("2222"));
            
            foreach (var s in values)
            {
                Console.WriteLine(s);
            }

            values.Remove("1111");
            values.RemoveFirst();
            values.RemoveLast();
            //下面的Remove方法会报异常 因为上面的RemoveLast()已经将aaa 的Node 删除掉了
            //values.Remove(t2);
        }
        #endregion
    }
}
