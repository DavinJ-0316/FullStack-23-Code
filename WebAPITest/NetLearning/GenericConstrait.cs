using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetLearning
{
    public class GenericConstrait<T> where T : class, new()
    {

    }


    public class GenericConstrait1<T> where T : user, new()
    {

    }


    public class user
    {

    }


    public class user2: user
    {

    }

    public class user3: user2
    {

    }

    public class user1
    {
     
        public user1(string name)
        {
            
        }
    }
}
