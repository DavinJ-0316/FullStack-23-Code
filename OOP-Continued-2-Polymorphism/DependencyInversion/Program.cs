using BusinessLogicLayer;
using DataAccessLayer;
using DIP.BusinessLogicLayer;
using DIP.Factory;
using DIP.IDataAccessLayer;
using IBusinessLogicLayer;

namespace DependencyInversion
{
		internal class Program
    {
        /// <summary>
        /// Dependency Inversion / IoC
        /// Dependency Injection
        /// 1. Definition: 
        ///     High-level modules should not depend on low-level modules
        ///     Abstractions should not depend on details
        ///     what is high level, what is low level
        ///     what is abstraction, what is details
        /// 2. Rule - loosly coupled(modules independent as much as possible/depend on each other to the least possible),
        ///           high cohesion(Encapsulation in the class)      
        ///    Coupling in simple words, is how much one component knows about the inner workings or inner implementation of another one
        ///    loose coupling is the target/object of OOP design
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            {
                #region 1. 依赖细节 - 直观且直接的写法 
                //anti-pattern: high level module (Console App) highly coupled with low level modules (BLL/DAL)
                SimplePhoneService phoneService = new SimplePhoneService();
                SimpleHuaWei huaWei = new SimpleHuaWei();
                phoneService.PlayHuaWei(huaWei);

                SimpleiPhone iPhone = new SimpleiPhone();
                phoneService.PlayIPhone(iPhone);

                SimpleSamsung samsung = new SimpleSamsung();
                phoneService.PlaySamsung(samsung);
                #endregion

            }
            #region How to de-couple
            //1. Create the abstraction(base class) for the different phones
            //2. Create the abstraction(interface) for the phone service
            //3. Console app relys on the base class and interface, rather than the details (classes)
            #endregion

            try 
            {
                #region 2. 做一点解耦 - 依赖抽象 BasePhone
                //按照定义去做 左边换成抽象 - 暂时体会不到好处
                IPhoneService phoneService1 = new PhoneService(); //new IPhoneService(); - 接口肯定是不能new的
                
                SimpleiPhone iphone = new SimpleiPhone();
                phoneService1.PlayIPhone(iphone);

                //依赖抽象BasePhone - 有利于扩展(新增手机品牌 phone service无需修改)
                BasePhone iPhone = new iPhone();
                phoneService1.PlayPhone(iPhone);

                BasePhone samsong = new Samsung();
                phoneService1.PlayPhone(samsong);

                BasePhone huawei = new HuaWei();
                phoneService1.PlayPhone(huawei);
                #endregion

                #region 3. 替换掉对PhoneService的依赖 - DI(依赖注入 - 一种实现IoC的方式)
                //让第三方来做 - 提供具体的Service的实例
                //不要忘记 手机对象 的实例化 也是一种对细节的依赖 
                //统统交由第三方 SimpleFactory来做
                {
                    IPhoneService service = SimpleFactory.CreatePhoneService("");
                    BasePhone iPhone2 = SimpleFactory.CreatePhone("iPhone");
                    service.PlayPhone(iPhone2);
                }
                #endregion
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);
            }

            Console.Read();
        }
    }
}
