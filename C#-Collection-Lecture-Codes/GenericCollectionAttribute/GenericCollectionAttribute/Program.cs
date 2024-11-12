using GenericCollectionAttribute.AttributeBasic;
using GenericCollectionAttribute.Collection;
using GenericCollectionAttribute.Collection.Yield;
using GenericCollectionAttribute.SerializableAttributeExampleFromMicrosoft;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Serialization;

namespace GenericCollectionAttribute
{
    internal class Program
    {
        static void Main(string[] args)
        {
    //        YieldProuct_BigData yieldProuct_BigData = new YieldProuct_BigData();
    //        int index = 0;
    //        var infiniteNumbers = yieldProuct_BigData.GenerateInfiniteSequence();
    //        foreach(int i in infiniteNumbers)
    //        {
    //            if(index < 100)
    //            {
				//	Console.WriteLine($"{index++} {i}");
				//}
    //            else
    //            {
    //                break;
    //            }
    //        }

            //IteratorPattern iteratorPattern = new IteratorPattern();
            //iteratorPattern.UsingEnumeratorIterator();
            //HashCollection_4 hashCollection_4 = new HashCollection_4();
            //    hashCollection_4.TestHashCollection();

            //    hashCollection_4.TestObjectHash();
            //    //差
            //    hashCollection_4.ExceptWith_Demo();
            //    //交
            //    hashCollection_4.IntersectWith_Demo();
            //    //并
            //    hashCollection_4.UnionWith_Demo();
            //    //补
            //    hashCollection_4.SymmetricExcept_Demo();

            //    hashCollection_4.TestSortedSet();


            //     hashCollection_4.TestHashtable();

            //ExplainCollectionInterfaces_5 explainCollectionInterfaces_5 = new ExplainCollectionInterfaces_5();
            //explainCollectionInterfaces_5.TestCollectionInterface();

            //    IteratorPattern iteratorPattern = new IteratorPattern();
            //    iteratorPattern.TestIterator();

            //    iteratorPattern.TestForeach();

            YieldDemo yieldDemo = new YieldDemo();
            Console.WriteLine($"*****************Yield Print****************************");
            yieldDemo.PrintYieldEventNumbers();

            Console.WriteLine($"*****************Common Print*****************");
            yieldDemo.PrintCommonEventNumbers();

            Console.Read();
            //    foreach (int i in yieldDemo.Power())
            //    {
            //        Console.WriteLine($"Yield return: {i}");
            //        //使用了Yield return的好处 或者说是特点 -- 可以控制返回停止
            //        if (i > 100)
            //        {
            //            Console.WriteLine($"value > 100, break");
            //            break;
            //        }
            //    }



            //    foreach (int i in yieldDemo.Common())
            //    {
            //        Console.WriteLine($"Common return {i}");
            //        //下面的虽然也是仅仅打印 小于100的数 但是已经取了所有的数据了
            //        if (i > 100)
            //        {
            //            Console.WriteLine($"value > 100, break");
            //            break;
            //        }
            //    }

            //    Console.WriteLine("End Hello world");
            //}

            //{
            //    ArrayType arrayType = new ArrayType();
            //    try
            //    {
            //        //arrayType.ArrayShow();
            //        //arrayType.ArrayListShow();
            //        arrayType.StringListShow();
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine(ex.Message);
            //    }

            //    LinkedList_2 linkedList_2 = new LinkedList_2();
            //    linkedList_2.LinedListMethod();
            //}

            //{
            //    GenericLearning genericLearning = new GenericLearning();

            //    //调用Generic method测试一下 建议带上类型参数 T (int, string ,DateTime ....)
            //    //Generic method的参数类型必须和类型参数一致， 否则报错 genericLeanring.Show<int>("testing");
            //    genericLearning.Show<int>(10);
            //    genericLearning.Show<string>("testing");
            //    genericLearning.Show<DateTime>(DateTime.Now);

            //    genericLearning.ShowGenericType();

            //    genericLearning.ShowMethod();

            //    genericLearning.Demo_12323();
            //    genericLearning.Demo_987987();

            //    GenericCache<string>.GetCache();
            //    GenericCache<int>.GetCache();

            //    for (int i = 0; i < 5; i++)
            //    {
            //        GenericCache<string>.GetCache();
            //        GenericCache<int>.GetCache();
            //    }
            //}

            {
                //UserState v2 = UserState.Deleted;
                //var v2string = v2.GetRemark2();

                ////4.2 - 在没有定义RemarkAttribute 和扩展方法之前的实现
                //UserState userState = UserState.Active;
                //if (userState == UserState.Active) Console.WriteLine($"Normal User");
                //else if (userState == UserState.Inactive)
                //{
                //    Console.WriteLine($"Inactive user");
                //}
                //else if (userState == UserState.Deleted)
                //{
                //    Console.WriteLine($"User removed");
                //}
                ////4.3 定义了 custom attribute Remark 后的shx
                //Console.WriteLine(userState.GetRemark());
                //Console.WriteLine(UserState.Inactive.GetRemark());
                //Console.WriteLine(UserState.NonUsed.GetRemark());                
            }

            {
                //演示一个应用了SerializableAttribute的对象 是如何被 binary serialization的
                //1. 处于安全原因 从.NET5.0 开始 后续的新的.Net 已经不支持 BinaryFormatter
                //   但是我们为了演示SerializableAttribute, 这里暂时通过
                //   <EnableUnsafeBinaryFormatterSerialization>true</EnableUnsafeBinaryFormatterSerialization>
                //   来允许它运行
                //2. 当不应用SerializableAttribute, 直接序列化 obj 时，会报错
                //3. 注意 该特性 并不影响 JSON或者 XML的序列化
                {
                    // Creates a new TestSimpleObject object.
                    TestSimpleObject obj = new TestSimpleObject();

                    Console.WriteLine("Before serialization the object contains: ");
                    obj.Print();

                    // Opens a file and serializes the object into it in binary format.
                    Stream stream = File.Open("data.xml", FileMode.Create);

                    BinaryFormatter formatter = new BinaryFormatter();

                    //XmlSerializer formatter = new XmlSerializer(typeof(TestSimpleObject));

                    formatter.Serialize(stream, obj);
                    stream.Close();

                    // Empties obj.
                    obj = null;

                    // Opens file "data.xml" and deserializes the object from it.
                    stream = File.Open("data.xml", FileMode.Open);
                    

                    obj = (TestSimpleObject)formatter.Deserialize(stream);
                    stream.Close();

                    Console.WriteLine("");
                    Console.WriteLine("After deserialization the object contains: ");
                    obj.Print();
                }

                //6. - 再扩展 定义一个决定是否比较对象属性值的 custom attribute
                //在下面的例子中 我们通过在Booking的字段上 应用 ComparableAttribute来决定是否参与比较 
                Booking b1 = new Booking();
                Booking b2 = new Booking();
                Booking b3 = new Booking();
                
                b1.Name = "Booking1";
                b1.Price = 100;
                b1.Description = "Description1";

                b2.Name = "Booking2";
                b2.Price = 200;
                b2.Description = "Description1";

                b3.Name = "Booking1";
                b3.Price = 100;
                b3.Description = "Description3";

                //b1 和 b2是不一样的 因为 Name 和 Price的值不一样
                IList<Variance> variances1 = b1.DetailedCompare(b2);
                //b1 和 b3是一样的 因为Descrition不参与比较
                IList<Variance> variances = b1.DetailedCompare(b3);
            }
        }
    }
}
