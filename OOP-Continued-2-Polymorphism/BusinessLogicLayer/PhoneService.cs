using DataAccessLayer;
using DIP.IDataAccessLayer;
using IBusinessLogicLayer;

namespace BusinessLogicLayer
{
	public class PhoneService : IPhoneService
	{
        #region 依赖细节 - 具体的phone品牌 新增新的手机品牌 就要新增新的方法
        public void PlayIPhone(SimpleiPhone phone)
		{
				phone.Call();
				phone.TextReader();
		}

        public void PlayHuaWei(SimpleHuaWei phone)
        {
            phone.Call();
            phone.TextReader();
        }

		public void PlaySamsung(Samsung samsung)
		{
			samsung.Call();
			samsung.TextReader();
		}
        #endregion

        #region 依赖抽象 - 一个方法 有利扩展
        public void PlayPhone(BasePhone phone)
		{
			phone.Call();
			phone.TextReader();
		}
        #endregion
    }
}
