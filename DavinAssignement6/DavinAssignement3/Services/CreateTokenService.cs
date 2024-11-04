using DavinAssignement3.Config;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DavinAssignement3.Services
{
    public class CreateTokenService
    {
        private readonly JWTConfig jwtConfig;

        public CreateTokenService(IOptions<JWTConfig> options)
        {
            this.jwtConfig = options.Value;
        }

        public string CreateToken(Dictionary<string, string> playBody)
        {
            var claims = new List<Claim>();
            foreach (var item in playBody)
                claims.Add(new Claim(item.Key, item.Value));

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.jwtConfig.SecrectKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: this.jwtConfig.Issuer,
                audience: this.jwtConfig.Audience,
                claims: claims,
                expires: DateTimeOffset.Now.LocalDateTime.AddSeconds(this.jwtConfig.ExpireSeconds),
                signingCredentials: creds);

            var jwtHandel = new JwtSecurityTokenHandler();
            var accessToken = jwtHandel.WriteToken(token);

            return accessToken;
        }
    }
}
