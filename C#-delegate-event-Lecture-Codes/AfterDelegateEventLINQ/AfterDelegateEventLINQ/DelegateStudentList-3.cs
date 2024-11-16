using RandomString4Net;

namespace AfterDelegateEventLINQ
{
    #region 为什么需要定义委托呢
    /// <summary>    
    ///   2.1 先定义一堆学生 (方便示例代码的生成 使用了第三方 package RandomString4Net 来随机生成 string 学生名) - 可以演示如何引入第三方package
    /// </summary>
    public class DelegateStudentList_3
    {
        public List<Student> Students = new List<Student>();

        public DelegateStudentList_3()
        {
            PrepareAllStudents();
        }

        #region  根据条件显示不同的students - 版本 V1.0
        // 过滤条件1： 找出年龄大于25的学生
        // 过滤条件2： 找出年龄大于25 并且 name 长度 大于 6的 student
        // 过滤条件3： 找出 age > 25 并且 name 长度 大于 6 并且 classId 大于2 的 student
        // 下面的代码实现了上面的3个过滤条件 - 但是呢 代码重复度有点高啊 尝试着做做优化呢 --> 2.3 看看版本1.1
        public void Show()
        {
            {
                //输出 age > 25的 student
                List<Student> result = new List<Student>();

                foreach (Student student in Students)
                {
                    if (student.Age > 25)
                    {
                        Console.WriteLine($"{student.Name} {student.Age}");
                        result.Add(student);
                    }
                }

                Console.WriteLine($"Students age > 25 total {result.Count}");
            }

            {
                //输出 age > 25 并且 name 长度 大于 6的 student
                IList<Student> result = new List<Student>();

                foreach (Student student in Students)
                {
                    if (student.Age > 25 && student.Name.Length > 6)
                    {
                        Console.WriteLine($"{student.Name} {student.Age}");
                        result.Add(student);
                    }
                }

                Console.WriteLine($"Students age > 25 and Name length > 6 total {result.Count}");
            }

            {
                //输出 age > 25 并且 name 长度 大于 6 并且 classId 大于2 的 student
                IList<Student> result = new List<Student>();

                foreach (Student student in Students)
                {
                    if (student.Age > 25 && student.Name.Length > 6 && student.ClassId > 2)
                    {
                        Console.WriteLine($"{student.Name} {student.Age} in class {student.ClassId}");
                        result.Add(student);
                    }
                }

                Console.WriteLine($"Students age > 25 and Name length > 6 and class Id > 2 total {result.Count}");
            }
        }

        #endregion

        #region 根据条件显示不同的students - 版本V1.1
        //    传入type 根据不同的值 构建不同的判断条件 
        //    这样看起来好像是代码的重复少了，但是实际上呢 这样的代码 其实毫无意义 将判断条件紧密耦合在一起
        //    如果有更多的过滤条件，只能修改方法 增加对type的判断 
        //    那么怎么解决这个头疼的问题呢? ---> 我们来想一想 不同点是在哪里: 不就是过滤条件不同吗 那么能不能将过滤条件作为参数传进去呢? --->看看 下面的委托方法作为参数 v2.0
        public List<Student> GetFilteredStudents(List<Student> studens, int type)
        {
            IList<Student> result = new List<Student>();
            //根据type的值 构造过滤条件
            //不推荐

            foreach (Student student in Students)
            {
                if (type == 1)
                {
                    if (student.Age > 25)
                    {
                        result.Add(student);
                    }
                }

                if (type == 2) 
                {
                    //把上面的条件放到这里
                }

                if (type == 3) 
                {
                    //把上面的条件放到这里
                }
            }
                          
            return result.ToList();
        }
        #endregion

        #region 委托方法作为参数 - 版本V2.0
        //现在需要将方法作为参数传递 就是将不同的逻辑行为定义为不同的方法参数 传递进来
        //把过滤条件写成方法，作为参数传给函数        
        /// 根据上面的需求 不过是什么过滤条件(是年龄大于25也好 是名字长度也罢， 或者是几个过滤条件同时满足也好 其实就是 输入参数是Student, 输出参数是个bool的函数)
        /// 那么我们就根据这个要求 定义下面这个委托                
        public delegate bool FilterStudentDelegate(Student student);

        /// <summary>
        /// 下面的方法接受 相同委托类型的 过滤行为(函数 或者说是委托示例) 真正的过滤动作由 传入的参数决定
        /// </summary>
        /// <param name="filterFunction"></param>
        /// <returns></returns>
        public List<Student> GetDelegateStudentsV2(FilterStudentDelegate filterFunction)
        {
            IList<Student> result = new List<Student>();

            foreach (Student student in Students)
            {
                if (filterFunction(student)) result.Add(student);                
            }

            return result.ToList();
        }
        #endregion

        #region 利用C#自带的泛型委托类型 Func<T>, 我们可以不用定义自己的delegate

        /// <param name="func"></param>
        /// <returns></returns>
        private List<Student> Get(Func<Student, bool> func)
        {
            IList<Student> result = new List<Student>();

            foreach (Student student in Students)
            {
                if (func(student)) result.Add(student);
            }

            return result.ToList();
        }
        #endregion
        private void PrepareAllStudents()
        {
            for (int i = 0; i <= 10; i++)
            {
                Students.Add(new Student
                {
                    Id = 1000 + i,
                    Name = $"{RandomString.GetString(Types.ALPHABET_LOWERCASE, 5, true)} {RandomString.GetString(Types.ALPHABET_LOWERCASE, 4, true)}",
                    Age = new Random().Next(10, 50) + i,
                    ClassId = i
                });
            }
        }				
    }

    #endregion
}
