using DIP.IDataAccessLayer;

namespace DataAccessLayer
{
    public class SimpleiPhone
    {
        //calling
        public void Call() { }
        //messaging
        public void TextReader() { }
    }

    public class iPhone : BasePhone 
    {
        public override void Call()
        {
            Console.WriteLine($"iPhone call");
        }

        public override void TextReader()
        {
            Console.WriteLine($"iPhone text reader");
        }
    }
}
