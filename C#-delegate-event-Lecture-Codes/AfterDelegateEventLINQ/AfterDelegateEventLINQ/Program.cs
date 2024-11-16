using AfterDelegateEventLINQ.LearningFromMicrosoft;
using static AfterDelegateEventLINQ.DelegateStudentList_3;

namespace AfterDelegateEventLINQ
{
    internal class Program
    {
        static void Main(string[] args)
        {
						//DelegateBasic delegateBasic = new DelegateBasic();
						//delegateBasic.Show();

						////NoReturnNoParam noReturnNoParam = new NoReturnNoParam(delegateBasic.Show);
						//NoReturnNoParam noReturnNoParam1 = delegateBasic.Show;
						////object/instance - class
						//noReturnNoParam1();
						//noReturnNoParam1.Invoke();

						//NoReturnNoParam noReturnNoParam2 = DelegateBasic.ShowStatic;//same signature

						//{
						//		MulticastDelegate_4 multicastDelegate_4 = new MulticastDelegate_4();
						//		multicastDelegate_4.MulticastDelegateExample();
						//}						
						//{
						//    DelegateStudentList_3 delegateStudentList_3 = new DelegateStudentList_3();
						//    delegateStudentList_3.GetFilteredStudents(delegateStudentList_3.Students, 1);
						//    delegateStudentList_3.GetFilteredStudents(delegateStudentList_3.Students, 2);
						//    delegateStudentList_3.GetFilteredStudents(delegateStudentList_3.Students, 3);
						//}
						//{
						//		/// <summary>
						//		/// 2.4.3 通过委托实例 传递 委托方法，将过滤条件(判断逻辑)和 调用方法解耦，如果遇到 各种各样的过滤条件，只需要传进来 过滤的逻辑(由调用者决定)，GetDelegateStudentsV2方法本身不需要改变 
						//		/// 试想 一下如果 过滤条件有几十种，如果都写入一个方法，需要频繁的修改现有方法，不仅容易出错，而且可扩展性差。违背了Open-Close开闭原则
						//		/// </summary>
						//		/// 
						//		DelegateStudentList_3 delegateStudentList_3 = new DelegateStudentList_3();
						//		//各个不同的过滤行为(方法/实现)
						//		bool GreaterThan25(Student student) { return student.Age > 25; }
						//		bool NameLengthMoreThan6(Student student) { return student.Age > 25 && student.Name.Length > 6; }
						//		bool AllConditions(Student student) { return student.Age > 25 && student.Name.Length > 6 && student.ClassId > 2; }

						//		var result = delegateStudentList_3.GetDelegateStudentsV2(GreaterThan25);
						//		Console.WriteLine($"Students age > 25 total {result.Count}");
						//		result = delegateStudentList_3.GetDelegateStudentsV2(NameLengthMoreThan6);
						//		Console.WriteLine($"Students age > 25 and Name length > 6 total {result.Count}");
						//		result = delegateStudentList_3.GetDelegateStudentsV2(AllConditions);
						//		Console.WriteLine($"Students age > 25 and Name length > 6 and class Id > 2 total {result.Count}");

						//}

						//#region Learning from Microsoft
						TemperatureMonitor temperatureMonitor = new TemperatureMonitor();//发布者
						TemperatureReporter temperatureReporter = new TemperatureReporter();//订阅者

						temperatureReporter.Subscribe(temperatureMonitor);//将二者关联

						temperatureMonitor.GetTemperature();//触发 订阅者行为

						temperatureReporter.Unsubscribe();// 退订

						temperatureMonitor.GetTemperature();//触发 就没有订阅者响应了

						//#endregion
						//#region Observer Pattern
						//ObserverPatternBasic_7.NoPattern.Program.Test();
						//      ObserverPatternBasic_7.OurWay.Program.Test();
						//      ObserverPatternBasic_7.DelegateEvent.Program.Test();
						//      #endregion
						Task_BeginInvoke task_BeginInvoke = new Task_BeginInvoke();
            task_BeginInvoke.BeginInvokeSample();
            Console.WriteLine($"Main caller .....");
			//DelegateStudentList_2 delegateStudentList_2 = new DelegateStudentList_2();
			//delegateStudentList_2.Show();


			#region 3.1 下面的方法通过 Code Block来创建 委托实例
			CodeBlockDelegate_2 safeInvoking_3 = new CodeBlockDelegate_2();
			safeInvoking_3.CodeBlockDelegate();
			#endregion

			#region 
			BuildInDelegates_5 buildInDelegates = new BuildInDelegates_5();
			buildInDelegates.ActionTesting();
			#endregion
			Console.ReadLine();
            //MulticastDelegate_5 multicastDelegate_5 = new MulticastDelegate_5();
            //multicastDelegate_5.MulticastDelegateExample();
            
            //LINQBasic.ApplyCustomWhere_V3();
        }
    }
}
