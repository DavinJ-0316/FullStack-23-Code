using System.Reflection.Metadata;
using System.Runtime.CompilerServices;

namespace AfterDelegateEventLINQ.LearningFromMicrosoft
{
		public class TemperatureReporter : IObserver<Temperature>
		{
				private IDisposable unsubscriber; //面向接口 隐藏了细节
				private bool first = true;
				private Temperature last;

				public virtual void Subscribe(IObservable<Temperature> provider)
				{
						unsubscriber = provider.Subscribe(this); //有退订的权力
						//async await ==> sync thinking -> async 			
						
						//Thread - resource os
						//TreadPool - max
						//Task / async await						
						
				}

				public virtual void Unsubscribe()
				{
						unsubscriber.Dispose();
				}

				public virtual void OnCompleted()
				{
						Console.WriteLine("Additional temperature data will not be transmitted.");
				}

				public virtual void OnError(Exception error)
				{
            Console.WriteLine($"Something error happened: {error.Message}");
        }

				public virtual void OnNext(Temperature value)
				{
						Console.WriteLine("The temperature is {0}°C at {1:g}", value.Degrees, value.Date);
						if (first)
						{
								last = value;
								first = false;
						}
						else
						{
								Console.WriteLine("   Change: {0}° in {1:g}", value.Degrees - last.Degrees,
																															value.Date.ToUniversalTime() - last.Date.ToUniversalTime());
						}
				}
		}
}
