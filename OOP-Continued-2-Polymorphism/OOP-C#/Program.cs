using Microsoft.VisualBasic;
using OOP_C_.Assignment_Encapsulation_Inherience;
using OOP_C_.Encapsulation;
using OOP_C_.Encapsulation.Phones;
using OOP_C_.Inheritance;
using OOP_C_.Inheritance.Polymorphism;
using OOP_C_.Inheritance.Polymorphism.Pet_Cat_Dog;
using System.Collections;

namespace OOP_C_
{
    /// <summary>
    /// 1. 面向对象 Object Oriented Programming - 是一种编程的思想
    /// 1.1 思想的转变 - 在C#编程过程中 需要让对象的概览 深入骨髓, 任何操作都离不开 object
    /// 1.2 常规思维解决问题 - 分步骤 面向过程
    /// 1.3 随着系统越来越复杂 面向过程就不适合了
    /// 2. 三大特性 封装-继承-多态
    /// </summary>
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");

      //      PetSitter petSitter = new PetSitter();
      //      //petSitter.FeedPet();
      //      petSitter.ShoutAfterDrink();

						//PlayerAssignment player1 = new PlayerAssignment();
      //      player1.Play();

      //      PrivateClass privateClass = new PrivateClass();
      //      privateClass.Name = "";
      //      privateClass.Method1();
           // #region 3. 通过一个例子切入面向对象的知识点 -- 通过手机来玩游戏
            //3.1 常规思维 面向过程 分步骤
            //Console.WriteLine("Step 1: Prepare a mobile phone");

            //Console.WriteLine("Step 2: Turn on the phone");

            //Console.WriteLine("Step 3: Waiting for the Internet connection");

            //Console.WriteLine("Step 4: Starting the game");

            //Console.WriteLine("Step 5: Playing the game......");

            //Console.WriteLine("Step 6: Stop the game");
            //#endregion

            //#region 封装
            //{
            //    //3.2 上面的步骤 本身没有任何问题 在后续的对象的方法中，要解决实际问题 那一定时分步骤来实现
            //    //3.3 让我们来通过面向对象的 思维来考虑 这个问题 - 通过手机来玩游戏
            //    //3.3.1 首先抽象出来各个参与者(class) - player phone game
            //    //3.3.2 面向对象的优点 - 相比较面向过程 支持多个不同的phone类型 扩展容易，对使用者而言 只关注对象 如果用面向过程 程序会越来越负责 例如选择不同的手机 完成相同的任务 判断手机品牌等等
            //    //3.3.3 通过封装 明确职责 方便调用 
            //    //  3.3.3.1 通过定义player和 phone(封装), 将细节隐藏在各自的类中 外部只要调用就可以了
            //    //  3.3.3.2 封装后的class 通过开放方法和属性 实现对外部的可见 然后也可以隐藏细节(e.g. 不想公开salary属性 外面的程序就不可见)
            //    //  3.3.3.3 外部不知道也不用关注内如的实现的细节 - 保证了程序的稳定 只要定义的接口不变 不管外部谁调用都是一样的结果 使得构建更大型的系统成为可能
            //    Encapsulation.Player player = new Encapsulation.Player();
            //    player.PlayIPhoneGame(new Encapsulation.Phones.iPhone());

            //}
            //#endregion

            //#region 继承
            //{
            //    //4 上面的封装 也产生了一些问题，那就是多个类功能类似 产生了重复的代码 (例如 Huawei/iPhone/Samsung手机类 --> 他们的代码很类似) 这就产生了 继承的概览 
            //    //4.1 将完全一样的东西放到base calss中
            //    //4.2 来看看通过定义基类BasePhone后 各手机对象还有哪些方法和属性
            //    Inheritance.BasePhone huawei = new Inheritance.Huawei();
            //    Inheritance.BasePhone iPhone = new Inheritance.iPhone();
            //    Inheritance.BasePhone samsung = new Inheritance.Samsung();
            //    Inheritance.BasePhone basePhone = new Inheritance.BasePhone();
                
            //    huawei.Text();
            //    iPhone.Call();
            //    samsung.PlayGame(new Game());
            //    //4.3 总结一下继承的特点 --- 简化了重复代码 可以实现多态
            //    //4.3.1 提一下 后续将实现 如下的编译时多态 根据对象的不同 方法的实现是不同的
            //    //目前还是调用的基类的PlayGame方法
            //    huawei.PlayGame(new Game());
            //    iPhone.PlayGame(new Game());
            //    samsung.PlayGame(new Game());

            //    //4.3.2 继承类中避免定义父类中已经有的方法 - 容易引起后续的麻烦和困惑
            //    //      如果真的有这种需要 想隐藏掉父类的同名方法 在方法前使用new关键字
                
            //    //4.3.3 继承的一个特点 --- 继承的完全性和侵入性
            //    //           不能选择继承父类的哪些内容： 子类只要继承了父类，那么被迫继承了父类的所有
            //    //           这就使得我们在定义父类子类关系的时候 要多思考一下 避免某些属性或者方法 有的子类需要有的子类可能并不需要 这时候就要review这些属性和方法是否适合放在父类中
            //    huawei.Call();
            //}
            //#endregion

            #region 多态
            {
                //5. 多态是几大特性里面的难点
                //5.1 理解性定义: 相同(基类型)的对象 执行相同名称的方法 由于方法的实现不同 导致结果的不同
                // 多态的几种种类或者说是几种体现多态的呈现方式：
                // 5.1.1 方法的重载 overload
                // 5.1.2 接口和实现类 interface + class
                // 5.1.3 抽象类和实现 abstract class + class
                // 5.1.4 基类和继承 base calss + class

                //5.2 如何通过多态来解决上面 继承的局限性 - 继承的完全性和侵入性(被迫 无条件 继承)
                //5.2.1 答案是 在基类中定义 抽象方法

                #region 5.3 抽象类的使用 - 通过抽象类和实现 实现了上面的(5.1.3)的运行时多态
                //5.3.1 抽象类不允许被实现 -- 思考下为什么(反向思考 如果可以实例化 那么如果调用没有实现的抽象方法 将怎么办呢? 所以不允许实例化抽象类)
                //BasePhoneWithPolymorphism phone = new BasePhoneWithPolymorphism();
                //5.3.2 只能实例化确定的 子类
                BasePhoneWithPolymorphism iPhone = new Inheritance.Polymorphism.iPhone();
                iPhone.Call();                

                //5.3.3 试着运行下面的 override的方法 -- 验证了抽象方法支持的多样性
                iPhone.SystemInfo();

                BasePhoneWithPolymorphism huawei = new Inheritance.Polymorphism.Huawei();
                huawei.Call();

								CompileTimePolymorphism compileTimePolymorphism = new CompileTimePolymorphism();
                compileTimePolymorphism.Foo();
                compileTimePolymorphism.Foo(1);

								//5.3.3 试着运行下面的 override的方法 -- 验证了抽象方法支持的多样性
								huawei.SystemInfo();
                #endregion
                #region 5.4 通过接口和实现 实现上面(5.1.2)的多态
                Inheritance.Polymorphism.Huawei huawei1 = new Inheritance.Polymorphism.Huawei();

                //5.4.1 我们以前一直说 接口不允许有实现 (转到IExtend.cs)否则会编译出错 但是 从C# 8.0 开始 新增加了一个特性 允许接口中添加默认方法
                //5.4.2 探讨一下这个新特性的存在价值： 首先看起来它个我们以前一直有的接口的定义存在矛盾 - 接口就是纯粹抽象 不应该有实现
                //5.4.3 那微软为什么要加这么个特性呢? 为了解决 接口的 破坏性扩展问题 - 一旦接口被release 任何它的修改 都是broken的 所有实现该接口的类都要被重写
                //      考虑到这个修改的影响和成本巨大，微软引入了接口默认方法. 这样所有其他没有实现该默认方法的类 依然可以正常使用 不会报错
                //      但是个人 还是不建议在接口中 包括实现 除非不得已
                //      而且： 接口的默认方法是不具备继承性的 - 实现接口的类 是看不到这个默认方法的 如下代码所示
                huawei1.Video();

                Inheritance.Polymorphism.iPhone iPhone1 = new Inheritance.Polymorphism.iPhone();
                //5.4.4 下面的Video方法调用的是哪个 - 接口的还是iPhone class的？(是类的而不是接口的, 因为接口的默认方法对类不可见)
                iPhone1.Video();

                Inheritance.Polymorphism.IExtend iPhone2 = new Inheritance.Polymorphism.iPhone();
                //5.4.5 下面的Video方法调用的是哪个呢?
                //虽然iPhone2的类型声明为 IExtend 但是由于它是运行时多态 它还是调用运行时的对象的Video方法 即iPhone的
                iPhone2.Video(1);

                //5.4.6 总结 验证了通过接口和具体的实现 实现了多态
                iPhone2.Video(1);

                Inheritance.Polymorphism.IExtend huawei2 = new Inheritance.Polymorphism.Huawei();
                huawei2.Video(1);
                #endregion

                #region 
                {
                    BaseClassWithoutAbstract v1 = new SubClass();
                    v1.Method1();
                    BaseClassWithoutAbstract v2 = new SubClass2();
                    v2.Method1();
                }
								#endregion
								//6. 提出问题:
								//下面的代码 - iPhone3 和 iPhone4都是iPhone类型的
								//为什么iPhone3 不能调用Video(int) 方法 iPhone4不能调用Call方法?
								//因为 存在运行时 vs 编译时 ---》报错是在编译时, 编译时iPhone3是 BasePhoneWithPolymorphism类型的 它没有 Call方法
								//当使用dynamic关键字来定义类型时候呢 避开编译器的检查 告诉编译器不要检查类型 运行时再来解决类型问题 - iPhone3_1.InvokeNotExistingMethod();这个都能编译通过
								//但是要注意 如果运行时对象没有所调用的方法  会产生运行时异常
								BasePhoneWithPolymorphism iPhone3 = new OOP_C_.Inheritance.Polymorphism.iPhone();
                iPhone3.Call();

                ((OOP_C_.Inheritance.Polymorphism.iPhone)iPhone3).Video();

                var varphone = new OOP_C_.Inheritance.Polymorphism.iPhone();
                dynamic varphone2 = new OOP_C_.Inheritance.Polymorphism.iPhone();

                varphone2.NotExit();


								varphone.Video(1);//避开
               // iPhone3.Video(1);
               
                dynamic iPhone3_1 = new OOP_C_.Inheritance.Polymorphism.iPhone();
                iPhone3_1.Video(1);
                iPhone3_1.InvokeNotExistingMethod();

                Inheritance.Polymorphism.IExtend iPhone4 = new Inheritance.Polymorphism.iPhone();
                //iPhone4.Call();
                iPhone4.Video(1);

                dynamic iPhone4_1 = new Inheritance.Polymorphism.iPhone();
                iPhone4_1.Call();
                iPhone4_1.Video(1);

                //7. 思考一下 在实际项目中我们往往需要一个基类BasePhone, 该基类支持了多态
                //7.1 在Player类中 考虑player可能会使用不同的手机玩游戏，如果没有基类 是不是对每个不同手机都需要一个方法?
                //7.2 参见Inherience/Player.cs 一个基类类型的参数就可以取代所有的 以手机为参数的方法 并且以后有新的手机类型
                //      不需要修改player class

                //现实的问题 - 如果有特殊性 例如只有某个类 具备的功能， 这时候就不具备抽象的条件了 只能面向细节 面向具体的类了
                // 面向抽象的方法就失去了 它的意义 

                #region 8. 既然abstract class和 interface 都是一种抽象 那么 如何选择抽象类 和接口
                //8.1 接口 是一种contract 约束(can do); 抽象类 (is a) 代表的是一种同类关系
                //8.2 举个例子 -- iPad 它也有拍照 电话 视频 短信功能 那么如果将iPad也继承自BasePhoneWithPolymorphisom 是不是一个好的设计呢?
                //8.2.1 首先 程序上 编译器不会报错 将iPad继承自BasePhoneWithPolymorphisom, 程序可以运行得很好
                //8.2.2 但是 以后如果基类BasePhoneWithPolymorphisom 新增一个iPad不具备的方法或者属性 那么就会影响iPad类 而这种影响是完全不必要的
                //8.2.3 所以这时 可以考虑将一些功能定义在一个接口中 通过实现而不是继承来使类具备这种能力 
                //8.2.4 同时 要记得 单继承 多个实现 (is a)的关系只能有一个 不可能既是这个类型又是那个类型 但是一个类可以具备多个接口的功能

                //9. 以汽车为例子 自己尝试一下定义 (接口/基类/子类)
                //9.1 汽车都有的属性和方法 -- Make Year Price Odometer BodyType Transmission Power
                //                      -- Drive Brake reverse 
                //    仅有些车才具备的功能 -- Alarm 360Views Auto-Trunk(后备箱)
                #endregion
                #region Virtual 方法以及它和Abstract方法的区别 
                #endregion

                #region 11. Testing - 下面的call()方法调用的使基类的还是子类的? (基类的 - 因为是编译时决定的)
                BasePhoneWithPolymorphism phone_Common_method_calling = new Inheritance.Polymorphism.iPhone();
                phone_Common_method_calling.Call();
                //11.1 virtual 方法 - 运行时决定 所以调用的是子类的
                BasePhoneWithPolymorphism phone_Virtual_method_calling = new Inheritance.Polymorphism.iPhone();
                phone_Virtual_method_calling.VirtualCall();
                #endregion
                //其他知识点 介绍
                //12. 介绍sealed 不希望被继续继承或者覆写override - 到自己为止不在具备继承性
                //13. base.Method() - 调用直接父类的同名方法
                //14. this.Method() - 调用当前实例的方法
                //15. 静态类没有abstract override virtual这些概念 因为它不具备继承性 - 参见 StaticClass.cs
            }
            #endregion
        }
    }
}
