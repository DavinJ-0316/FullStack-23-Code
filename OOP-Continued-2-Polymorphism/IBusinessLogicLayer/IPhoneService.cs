using DataAccessLayer;
using DIP.IDataAccessLayer;

namespace IBusinessLogicLayer
{
    public interface IPhoneService
    {
        void PlayIPhone(SimpleiPhone phone);
        void PlayPhone(BasePhone phone);
    }
}
