namespace LINQTest
{
    public class Program
    {
        private static List<string> letters = new List<string>() { "a", "b", "c", "d", "e", "f", "g" };

        private static List<int> numbers = new List<int>() { 1, 7, 9, 3, 4, 2 };
        static void Main(string[] args)
        {
            //查询表达式
            var letter = from s in letters
                         where s == "f"
                         select s;

            //lambda 表达式
            letter = letters.Where(s => s == "f");
            Console.WriteLine(letter.First());


            foreach (var item in letters)
            {
                Console.WriteLine(item);
            }
            Console.WriteLine("=====================");

            var odrs = from s in letters
                       orderby s descending
                       select s;

            foreach (var item in odrs)
            {
                Console.WriteLine(item);
            }
            var odrslist = letters.OrderDescending().ToList();

           // var sumList = from s in numbers
           //           select s;

           //var tottal= sumList.Sum();

            var total = numbers.Sum();

            var average = (int)numbers.Average();
            Console.WriteLine("=====================");
            Console.WriteLine("total:{0},average:{1}", total,average);
            Console.ReadKey();
        }
    }
}
