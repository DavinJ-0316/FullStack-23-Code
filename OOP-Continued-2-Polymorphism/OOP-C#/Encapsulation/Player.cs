using OOP_C_.Encapsulation.Phones;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_C_.Encapsulation
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }

        /// <summary>
        /// Hide the privacy
        /// </summary>
        private double Salary { get; set; }

        public void PlayIPhoneGame(iPhone iPhone)
        {
            Game game = new Game();
            iPhone.PlayGame(game);
        }
    }
}
