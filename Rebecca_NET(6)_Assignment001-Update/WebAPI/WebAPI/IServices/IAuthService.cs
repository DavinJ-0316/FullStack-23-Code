namespace WebAPI.IServices
{
    public interface IAuthService
    {
        public string GenerateJwtToken(string username);
    }
}
