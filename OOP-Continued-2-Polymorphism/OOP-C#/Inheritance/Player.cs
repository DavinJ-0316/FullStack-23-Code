using OOP_C_.Encapsulation;
using OOP_C_.Inheritance.Polymorphism;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Inheritance
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }

        /// <summary>
        /// Hide the privacy
        /// </summary>
        private double Salary { get; set; }

        //如果有新增的手机品种 那需要修改player的class 新增一个方法来支持新手机
        //这种改变player的内部实现 不可以接受 不是一个好的设计 
        //如果我们的方法参数类型时基类 - BasePhone 那无论是那种手机只要继承自这个基类都可以作为参数传进来
        //Player class就不需要修改了
        public void PlayIPhoneGame(iPhone iPhone)
        {
            Game game = new Game();
            iPhone.Text();
            iPhone.Call();
            iPhone.PlayGame(game);
        }

        public void PlayHuaweiGame(Huawei huawei)
        {
            Game game = new Game();
            huawei.Text();
            huawei.Call();
            huawei.PlayGame(game);
        }

        public void PlaySamsungGame(Samsung samsung)
        {
            Game game = new Game();
            samsung.Text();
            samsung.Call();
            samsung.PlayGame(game);
        }

        public void PlayBasePhoneGame(BasePhone basePhone)
        {
            Game game = new Game();
            basePhone.Text();
            basePhone.Call();
            basePhone.PlayGame(game);
        }

        public void PlayPolyBasePhone(BasePhoneWithPolymorphism phone)
        {
            Game game = new Game();
            phone.PlayGame(game);
            phone.Call();
            phone.Text();
        }
    }
}
