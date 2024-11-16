namespace AfterDelegateEventLINQ
{
    public class BuildInDelegates_5
	{
		//无输出
		public void ActionTesting()
		{
			Action action = new Action( () => { Console.WriteLine($"Action - no param, no return"); });
			action();

			Action<int> action1 = x => Console.WriteLine($"Generic Action - int input {x}, no return ");
			action1(1);

			//最多支持16个输入参数
			Action<int, int, string> action2 = (i1, i2, s1) => { int result = i1 + i2; Console.WriteLine($"Action 2 : {result} -{s1}"); };
			action2.Invoke(2,3,"ss");
		}

		//有输出
		public void FuncTesting() 
		{
			Func<int, int, int> sum = (a, b) => a + b;
			var result = sum(2, 4);
			Console.WriteLine($"{result}");

			Func<DateTime> whatTimeIsIt = () => DateTime.Now;
			var result2 = whatTimeIsIt();

	
			Console.WriteLine($"{result2}");
		}

		// A method that checks if a number is even
		public bool IsEven(int number)
		{
			return number % 2 == 0;
		}

		// A method that performs an operation using Predicate
		public bool PerformOperation(Predicate<int> operation, int number)
		{
			return operation(number);
		}

		public void PredicateTesting() 
		{
			Predicate<int> pre = delegate (int a) { return a % 2 == 0; };					
			var result = pre(1);

			// Usage
			bool isEven = PerformOperation(IsEven, 6);
			Console.WriteLine(isEven); // Output: True
		}
	}
}
