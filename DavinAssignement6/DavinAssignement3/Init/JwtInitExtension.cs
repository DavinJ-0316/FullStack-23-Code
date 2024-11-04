using DavinAssignement3.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DavinAssignement3.Init
{
    public static class JwtInitExtension
    {
        public static void AddJWT(this IServiceCollection services, JWTConfig jWTConfig) 
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
                AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jWTConfig.Issuer,
                    ValidateIssuer = true,
                    ValidAudience = jWTConfig.Audience,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jWTConfig.SecrectKey)),
                };
            });
        }
    }
}
