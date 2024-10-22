using WebAPITest.Models;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using WebAPITest.IService;

namespace WebAPITest.Service
{
    public class UserServiceDB : IUserService
    {
        private string connection = "server=localhost;port=3306;database=myfirstdb;user=root;password=12345678";
        public bool Insert(User user)
        {
            try
            {
                //MySqlConnection mySqlConnection = new MySqlConnection(connection);
                //mySqlConnection.Open();

                //string insertSql = "insert into user(username,email,address,gender) values('" + user.UserName + "','" + user.Email + "','" + user.Address + "','" + (int)user.Gender + "')";
                //MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
                //mySqlCommand.CommandText = insertSql;
                //var count = mySqlCommand.ExecuteNonQuery();
                //mySqlCommand.Dispose();
                //mySqlConnection.Close();
                //return count > 0;

                //using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
                //{
                //    mySqlConnection.Open();
                //    string insertSql = "insert into user(username,email,address,gender) values('" + user.UserName + "','" + user.Email + "','" + user.Address + "','" + (int)user.Gender + "')";
                //    MySqlCommand mySqlCommand = mySqlConnection.CreateCommand();
                //    mySqlCommand.CommandText = insertSql;
                //    var count = mySqlCommand.ExecuteNonQuery();
                //    mySqlCommand.Dispose();
                //    return count > 0;
                //}

                //using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
                //{
                //    mySqlConnection.Open();
                //    string insertSql = "insert into user(username,email,address,gender) values('" + user.UserName + "','" + user.Email + "','" + user.Address + "','" + (int)user.Gender + "')";
                //    using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                //    {
                //        mySqlCommand.CommandText = insertSql;
                //        var count = mySqlCommand.ExecuteNonQuery();
                //        return count > 0;
                //    }
                //}


                using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
                {
                    mySqlConnection.Open();
                    string insertSql = "insert into user(username,email,address,gender) values(@username,@email,@address,@gender)";
                    using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
                    {

                        mySqlCommand.CommandText = insertSql;
                        mySqlCommand.Parameters.AddWithValue("@username", user.UserName);
                        mySqlCommand.Parameters.AddWithValue("@email", user.Email);
                        mySqlCommand.Parameters.AddWithValue("@address", user.Address);
                        mySqlCommand.Parameters.AddWithValue("@gender", user.Gender);
                        var count = mySqlCommand.ExecuteNonQuery();
                        return count > 0;
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return true;
        }

        //public List<User> GetAll()
        //{
        //    List<User> users = new List<User>();
        //    using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
        //    {
        //        mySqlConnection.Open();
        //        string Sql = "select * from user";
        //        using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
        //        {
        //            mySqlCommand.CommandText = Sql;
        //            var rd = mySqlCommand.ExecuteReader();
        //            while (rd.Read())
        //            {
        //                User user = new User();
        //                user.UserName = rd.GetString("username");
        //                user.Email = rd.GetString("email");
        //                user.Address = rd.GetString("address");
        //                user.Gender = (GenderEnum)rd.GetInt16("gender");
        //                users.Add(user);
        //            }
        //            rd.Close();


        //            //var dr1= mySqlCommand.ExecuteReader();
        //            // DataTable dt = new DataTable();
        //            // dt.Load(dr1);

        //            //mySqlCommand.ExecuteScalar()
        //        }
        //    }

        //    return users;
        //}


        //public List<User> GetAll()
        //{
        //    List<User> users = new List<User>();
        //    using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
        //    {
        //        mySqlConnection.Open();
        //        string Sql = "select * from user";
        //        using (MySqlCommand mySqlCommand = mySqlConnection.CreateCommand())
        //        {
        //            mySqlCommand.CommandText = Sql;
        //            var rd = mySqlCommand.ExecuteReader();
        //            DataTable dt = new DataTable();
        //            dt.Load(rd);//load in memory
        //            rd.Close();
        //            foreach (DataRow dr in dt.Rows)
        //            {
        //                User user = new User();
        //                user.UserName = ConvertToString(dr["username"]);
        //                user.Email = ConvertToString(dr["email"]);
        //                user.Address = ConvertToString( dr["address"]);
        //                user.Gender =dr["gender"] == DBNull.Value? GenderEnum.M: (GenderEnum)Convert.ToInt32(dr["gender"]);
        //                users.Add(user);
        //            }
        //        }
        //    }

        //    return users;
        //}

        public List<User> GetAll()
        {
            List<User> users = new List<User>();
            using (MySqlConnection mySqlConnection = new MySqlConnection(connection))
            {
                mySqlConnection.Open();
                string Sql = "select * from user";
                MySqlDataAdapter adapter = new MySqlDataAdapter(Sql, mySqlConnection);

                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                foreach (DataRow dr in dataTable.Rows)
                {
                    User user = new User();
                    user.UserName = ConvertToString(dr["username"]);
                    user.Email = ConvertToString(dr["email"]);
                    user.Address = ConvertToString(dr["address"]);
                    user.Gender = dr["gender"] == DBNull.Value ? GenderEnum.M : (GenderEnum)Convert.ToInt32(dr["gender"]);
                    users.Add(user);
                }
            }

            return users;
        }

        private string? ConvertToString(object obj)
        {
            if (obj == null)
                return null;
            if (obj == DBNull.Value)
                return null;

            return Convert.ToString(obj);

        }
    }
}
