using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenericCollectionAttribute.Generic
{
    public interface IPeople
    {
        void Show();
    }

    public interface ISport
    {
        void PlayFootball();
    }
    public class FeatureHandyman : IPeople
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual void Show()
        {
            Console.WriteLine($"FeatureHandyman");
        }
    }

    public class NonFeatureHandyman : IPeople
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual void Show()
        {
            Console.WriteLine($"NonFeatureHandyman");
        }
    }

    public class ChinesePeople : FeatureHandyman
    {        
        public override void Show()
        {
            Console.WriteLine($"ChinesePeople");
        }
    }

    public class JapanPeople: NonFeatureHandyman, ISport
    {        
        public void PlayFootball() { Console.WriteLine($"PlayFootball"); }
    }

    public class GermanPeople : FeatureHandyman, ISport
    {
        public override void Show()
        {
            Console.WriteLine($"ChinesePeople");
        }

        public void PlayFootball()
        {
            Console.WriteLine($"PlayFootball");
        }
    }

    public interface IPeople<T>
    {
        void Show(T t);
    }

    public class BasePeople<T> : IPeople<T>
    {
        public virtual void Show(T t)
        {
            Console.WriteLine($"BasePeople");
        }
    }

    public class ChinesePeople<T> : BasePeople<T>
    {
        public override void Show(T t)
        {
            Console.WriteLine($"t.GetType().Name");
        }
    }
}
