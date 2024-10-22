namespace NetLearning
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //int
            //NormalClass normalClass = new NormalClass(123);
            //int num = normalClass.GetData();

            //string
            //NormalClass normalClass = new NormalClass("lily");
            //string name = normalClass.GetData();

            //object
            //NormalClass normalClass = new NormalClass(123);
            //object num = normalClass.GetData();

            //int sum = (int)num;
            //sum = sum++;

            //Console.WriteLine(num);

            ////how to use generic
            //// 使用泛型类处理整数类型
            //GenericClass<int> intObject = new GenericClass<int>(123);
            //Console.WriteLine(intObject.GetData());  // 输出: 123

            //// 使用泛型类处理字符串类型
            //GenericClass<string> stringObject = new GenericClass<string>("Hello");
            //Console.WriteLine(stringObject.GetData());  // 输出: Hello

            //// 使用泛型接口的实现类处理整数类型
            //IRepository<int> intRepo = new Repository<int>();
            //intRepo.Add(100);
            //Console.WriteLine(intRepo.GetById(0));  // 输出: 100

            //// 使用泛型接口的实现类处理字符串类型
            //IRepository<string> stringRepo = new Repository<string>();
            //stringRepo.Add("Generics in .NET");
            //Console.WriteLine(stringRepo.GetById(0));  // 输出: Generics in .NET

            ////泛型约束
            //GenericConstrait<user> genericConstrait = new GenericConstrait<user>();

            //GenericConstrait<user1> genericConstrait1 = new GenericConstrait<user1>();

            //GenericConstrait1<user2> genericConstrait1 = new GenericConstrait1<user2>();

            //// GenericConstrait1<user3> genericConstrait2 = new GenericConstrait1<user3>();

            ////.net 内置泛型类型

            //List<T>
            List<int> numbers = new List<int>(); // 创建一个存储整数的泛型列表
            numbers.Add(1);  // 添加元素
            numbers.Add(2);
            Console.WriteLine(numbers[0]);  // 按索引访问，输出: 1


            // Queue<T>
            Queue<int> queue = new Queue<int>(); // 创建一个存储整数的泛型队列
            queue.Enqueue(10);  // 入队
            queue.Enqueue(20);
            int firstElement = queue.Dequeue();  // 出队，输出: 10
            Console.WriteLine(firstElement);


            //Dictionary<TKey, TValue>
            Dictionary<string, string> dictionary = new Dictionary<string, string>(); // 创建一个存储字符串键值对的泛型字典
            dictionary.Add("name", "Alice");  // 添加键值对
            dictionary.Add("city", "New York");
            if (dictionary.ContainsKey("name"))
            {
            }

            Console.WriteLine(dictionary["name"]);  // 根据键获取值，输出: Alice

            //IEnumerable<T>

            IEnumerable<int> Enumerablenumbers = new List<int>() { 1, 2, 3, 4 }; // 创建一个 IEnumerable<int> 对象
            foreach (var number in Enumerablenumbers)
            {
                Console.WriteLine(number);  // 依次输出集合中的每个元素
            }

        }
    }
}
