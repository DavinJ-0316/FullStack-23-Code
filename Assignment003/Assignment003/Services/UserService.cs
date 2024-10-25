using Assignment003.Config;
using Assignment003.Enum;
using Assignment003.IServices;
using Assignment003.Models;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;
using System.Data;

namespace Assignment003.Services
{
    public class UserService : IUerService
    {
        private DBConnectionConfig dBConnectionConfig;
        public UserService(IOptions<DBConnectionConfig> options)
        {
            this.dBConnectionConfig = options.Value;
        }
        public bool AddUser(User user)
        {
            using (MySqlConnection mySqlConnection = new MySqlConnection(this.dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();
                string insertSql = "insert into user(username,email,address,gender,phone,password) values(@username,@email,@address,@gender,@phone,@password)";
                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {

                    mySqlCommand.CommandText = insertSql;
                    mySqlCommand.Parameters.AddWithValue("@username", user.UserName);
                    mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                    mySqlCommand.Parameters.AddWithValue("@address", user.Address);
                    mySqlCommand.Parameters.AddWithValue("@gender", user.Gender);
                    mySqlCommand.Parameters.AddWithValue("@phone", user.Phone);
                    mySqlCommand.Parameters.AddWithValue("@password", user.Password);
                    var count = mySqlCommand.ExecuteNonQuery();
                    return count > 0;
                }
            }
        }

        public bool DeleteUsers() { throw new NotImplementedException(); }

        public List<User> GetUsers()
        {

            List<User> users = new List<User>();
            using (MySqlConnection mySqlConnection = new MySqlConnection(this.dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();
                string Sql = "select * from user";
                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {
                    mySqlCommand.CommandText = Sql;
                    var rd = mySqlCommand.ExecuteReader();
                    while (rd.Read())
                    {
                        User user = new User();
                        user.UserName = rd.GetString("username");
                        user.Email = rd.GetString("email");
                        user.Address = rd.GetString("address");
                        user.Gender = (Gender)rd.GetInt16("gender");
                        user.Phone = rd.GetString("phone");
                        users.Add(user);
                    }
                    rd.Close();
                }
            }

            return users;
        }

        public bool UpdateUsers(User user)
        {
            using (MySqlConnection mySqlConnection = new MySqlConnection(this.dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();

      
                string querySql = "SELECT id, username, email, address, gender, phone, password FROM user WHERE id = @id";

                string updateSql = "UPDATE user SET username = @username, email = @email, address = @address, gender = @gender, phone = @phone, password = @password WHERE id = @id";

                using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                {
                    // 查询是否存在该用户
                    mySqlCommand.CommandText = querySql;
                    mySqlCommand.Parameters.AddWithValue("@id", user.Id);

                    using (var reader = mySqlCommand.ExecuteReader())
                    {
                        if (!reader.HasRows)
                            return false;
                    }

                    // 重置命令参数，防止冲突
                    mySqlCommand.Parameters.Clear();

                    mySqlCommand.CommandText = updateSql;
                    mySqlCommand.Parameters.AddWithValue("@username", user.UserName);
                    mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                    mySqlCommand.Parameters.AddWithValue("@address", user.Address);
                    mySqlCommand.Parameters.AddWithValue("@gender", user.Gender);
                    mySqlCommand.Parameters.AddWithValue("@phone", user.Phone);
                    mySqlCommand.Parameters.AddWithValue("@password", user.Password);
                    mySqlCommand.Parameters.AddWithValue("@id", user.Id);

                    var count = mySqlCommand.ExecuteNonQuery();
                    return count > 0;
                }
            }
        }

        public bool DeleteUser(int id)
        {
            using (MySqlConnection mySqlConnection = new MySqlConnection(this.dBConnectionConfig.DBConnection))
            {
                mySqlConnection.Open();
                string deleteSql = "DELETE FROM user WHERE id = @id";
                using (MySqlCommand deleteCommand = new MySqlCommand(deleteSql, mySqlConnection))
                {
                    deleteCommand.Parameters.AddWithValue("@id", id);
                    var rowsAffected = deleteCommand.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
            }
        }

    }
}
