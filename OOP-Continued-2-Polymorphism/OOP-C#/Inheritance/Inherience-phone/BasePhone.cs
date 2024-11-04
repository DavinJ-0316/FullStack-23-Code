using OOP_C_.Encapsulation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance
{
    /// <summary>
    /// 将所有手机的共同的属性和方法提取出来 放到一个基类中
    /// 所有继承自该积累的手机 就都有了这些方法和属性
    /// 好处 减少了代码的重复 和后续的维护
    /// </summary>
    public class BasePhone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public int VersionNo { get; set; }

        public void Call()
        {
            Console.WriteLine($"{GetType().Name} calling");
        }

        public void Text()
        {
            Console.WriteLine($"{GetType().Name} messaging");
        }

        public void PlayGame(Game game)
        {
            game.Start();
        }
    }
}
