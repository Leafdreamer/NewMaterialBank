using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaterialsLib
{
    public class UserRepository
    {
        private List<User> userList;
        private int nextUserID;

        public UserRepository()
        {
            userList = new List<User>();

            User u1 = new User(1, "admin@email.com", "1234", true);
            User u2 = new User(1, "user@email.com", "1234", false);

            userList.Add(u1);
            userList.Add(u2);

            nextUserID = 3;
        }

        public List<User> GetAllUsers()
        {
            return new List<User>(userList);
        }

        public User? GetUserById(int id)
        {
            return userList.FirstOrDefault(x => x.Id == id);
        }

        public User? GetUserByEmail(string email)
        {
            return userList.FirstOrDefault(x => x.Email == email);
        }

        public User AddUser(User user)
        {
            user.ValidateEmail();
            user.ValidatePassword();

            user.Id = nextUserID;
            nextUserID++;

            user.Admin = false;

            userList.Add(user);
            return user;
        }

    }
}
