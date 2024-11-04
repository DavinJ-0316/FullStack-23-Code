using DavinAssignement3.Config;
using DavinAssignement3.IServices;
using DavinAssignement3.Model;
using DavinAssignement3.Enum;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;


namespace DavinAssignement3.Services
{
    public class UserService : IUserService
    {
        private DBConnectionConfig _dBConnectionConfig {  get; set; }
        public UserService(IOptions<DBConnectionConfig> options) {
           this._dBConnectionConfig = options.Value;
        }

        public bool AddUser(User user)
        {
/*            if (user == null)
            {
                throw new ArgumentNullException("please provide input");
            }*/

            using (MySqlConnection mySqlConnection = new MySqlConnection(this._dBConnectionConfig.DBConnection)) 
            {
                mySqlConnection.Open();

                string sqlQuery = "insert into user(username, email, password, gender, address, phone) values(@username, @email, @password, @gender, @address, @phone)";

                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {
                    mySqlCommand.CommandText = sqlQuery;
                    mySqlCommand.Parameters.AddWithValue("@username", user.UserName);
                    mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                    mySqlCommand.Parameters.AddWithValue("@password", user.Password);
                    mySqlCommand.Parameters.AddWithValue("@gender", user.Gender);
                    mySqlCommand.Parameters.AddWithValue("@address", user.Address);
                    mySqlCommand.Parameters.AddWithValue("@phone", user.Phone);
                    var count = mySqlCommand.ExecuteNonQuery();
                    return count > 0;
                }
            }
        }

        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            using (MySqlConnection mySqlConnection = new MySqlConnection(this._dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();

                string sqlQuery = "select * from user";

                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {
                    mySqlCommand.CommandText = sqlQuery;
                    var rd = mySqlCommand.ExecuteReader();
                    while (rd.Read())
                    {
                        User user = new User();
                        user.UserName = rd.GetString("username");
                        user.Email = rd.GetString("email");
                        user.Password = rd.GetString("password");
                        user.Address = rd.GetString("address");
                        user.Gender = (Gender)rd.GetInt16("gender");
                        user.Phone = rd.GetString("phone");
                        users.Add(user);
                    }
                }

            }
            return users;
        }

        public bool UpdateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("please provide input");
            }

            using (MySqlConnection mySqlConnection = new MySqlConnection(this._dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();
                string sqlQueryFindCurrentUser = "select * from user where email = @email";
                string sqlQueryUpdateCurrentUser = "UPDATE user SET username = @username, email = @email, address = @address, gender = @gender, phone = @phone, password = @password WHERE email = @email";

                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {
                    mySqlCommand.CommandText = sqlQueryFindCurrentUser;
                    mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                    using (var rd = mySqlCommand.ExecuteReader())
                    {
                        if (!rd.HasRows)
                        {
                            return false;
                        }
                    }

                    mySqlCommand.Parameters.Clear();

                    mySqlCommand.CommandText = sqlQueryUpdateCurrentUser;
                    mySqlCommand.Parameters.AddWithValue("@username", user.UserName);
                    mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                    mySqlCommand.Parameters.AddWithValue("@password", user.Password);
                    mySqlCommand.Parameters.AddWithValue("@gender", user.Gender);
                    mySqlCommand.Parameters.AddWithValue("@address", user.Address);
                    mySqlCommand.Parameters.AddWithValue("@phone", user.Phone);
           /*         mySqlCommand.Parameters.AddWithValue("@id", user.Id);*/

                    var count = mySqlCommand.ExecuteNonQuery();
                    return count > 0;
                }
            }
        }

        public bool DeleteUser(string email)
        {
            using (MySqlConnection mySqlConnection = new MySqlConnection(this._dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();
                string sqlQuery = "delete from user where email = @email";
                using (MySqlCommand deleteCommand = new MySqlCommand(sqlQuery, mySqlConnection))
                {
                    deleteCommand.Parameters.AddWithValue("@email", email);
                    var count = deleteCommand.ExecuteNonQuery();
                    return count > 0;
                }
            }
        }
    }
}
