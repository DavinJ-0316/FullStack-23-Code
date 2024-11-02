using DataAccessLayer;
using DIP.IDataAccessLayer;
using IBusinessLogicLayer;
using System.Configuration;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace DIP.Factory
{
	//通过工厂来创建service instance
	public class SimpleFactory
	{
		#region - 读取配置	
		private static string BasePhoneAssembly = ConfigurationManager.AppSettings["BasePhoneAssembly"];
				//DataAccessLayer.iPhone,DIP.DataAccessLayer|DataAccessLayer.Samsung,DIP.DataAccessLayer
		private static string PhoneServiceAssembly = ConfigurationManager.AppSettings["PhoneServiceAssembly"];
    #endregion

    public static BasePhone CreatePhone(string phone)//iPhone //Samsung
		{						
			//return new BasePhone(); //?? 这样写法 将依赖转移到了Factory 而没有解决问题
			//怎么解决?  -- 配置加反射

				Assembly assembly = Assembly.Load(PhoneServiceAssembly);
				var types = BasePhoneAssembly.Split("|"); // [DataAccessLayer.iPhone,DIP.DataAccessLayer,DataAccessLayer.Samsung,DIP.DataAccessLayer]
				var phonetypevalue = types.FirstOrDefault(x=>x.Contains(phone));
				Type phoneType = assembly.GetType(phonetypevalue);
				BasePhone phoneobj = (BasePhone)Activator.CreateInstance(phoneType);
				return phoneobj;
						//Type type = assembly.GetType(BasePhoneAssembly.Split(",")[0]);
						//return (BasePhone)Activator.CreateInstance(type);
				}

		public static IPhoneService CreatePhoneService(string s)
		{
				Assembly assembly = Assembly.Load("DIP.BusinessLogicLayer");
        Type type = assembly.GetType("BusinessLogicLayer.PhoneService");
        return (IPhoneService)Activator.CreateInstance(type);
    }

        #region
		//通过这种方式的好处 -- 如果以后有针对 PhoneService的升级 (PhoneServiceV2),只需要修改配置文件就能 实例化 PhoneServiceV2的实例 调用其升级方法
        #endregion
    }
}
