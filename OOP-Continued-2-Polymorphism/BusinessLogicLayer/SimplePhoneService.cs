using DataAccessLayer;
using DIP.IDataAccessLayer;

namespace DIP.BusinessLogicLayer
{
	public class SimplePhoneService
	{
		public void PlayIPhone(SimpleiPhone phone)
		{
				phone.Call();
				phone.TextReader();
		}

		public void PlayHuaWei(SimpleHuaWei huaWei)
		{
				huaWei.Call();
				huaWei.TextReader();
		}

		public void PlaySamsung(SimpleSamsung samsung)
		{
				samsung.Call(); 
				samsung.TextReader();
		}
	}
}
