namespace DavinAssignement3.Config
{
    public class JWTConfig
    {
        public const string Section = "JWTConfig";
        public string SecrectKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }

        public int ExpireSeconds { get; set; }
    }
}
