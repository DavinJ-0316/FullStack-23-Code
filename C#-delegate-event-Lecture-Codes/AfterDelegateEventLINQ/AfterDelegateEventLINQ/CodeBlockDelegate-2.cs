namespace AfterDelegateEventLINQ
{
    #region 通过Code block方式来定义委托
    /// <summary> 
    ///   Lambda 表达式
    ///     表达式Lambda
    ///     Statement Lambda
    ///   匿名方法方式 - 使用delegate关键字
    /// </summary>
    public class CodeBlockDelegate_2
    {
        public void CodeBlockDelegate()
        {
			    IntReturnWithParam expressionLambda = (j) => j + 1;
                IntReturnWithParam statementLambda = (i) =>
                {
                    Console.WriteLine("statementLambda add 1.");
                    return i + 1;
                };

			    var i = expressionLambda(2);
			    Console.WriteLine(i);
			    var j = statementLambda(3);
			    Console.WriteLine(j);

			    //匿名方法方式
			    //omit the parameter list
			    IntReturnNoParam anonymousMethod = delegate { return 10; };
			    var k = anonymousMethod();
                Console.WriteLine($"anonymousMethod {k}");

			    //use discards (_) to specify input parameters of an anonymous method that aren't used by the method
			    IntReturnWithParam anonymousMethod2 = delegate (int _) { return 25; };
			    var op2 = anonymousMethod2(12);
			    Console.WriteLine($"anonymousMethod1 {op2}");

			    VoidReturnParam anonymousMethod3 = delegate (int _, int k) { Console.WriteLine($"{k} input as parameter"); };
			    anonymousMethod3(-999, 12);						

			    //using parameter inside the method
			    IntReturnWithParam anonymousMethod1 = delegate (int o) { return o + 20; };
			    var op = anonymousMethod1(12);
                Console.WriteLine($"anonymousMethod1 {op}");
		    }       
    }

    #endregion
}
