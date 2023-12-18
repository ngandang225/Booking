using BCrypt.Net;
using Domain.UserDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserServices
    {
        public IEnumerable<UserDomain> GetAll();
        public UserDomain GetById(int id);
        public UserDomain Add(UserDomain user);
        public UserDomain Update(UserDomain user);
        public bool Delete(int id);
        public UserDomain Login(UserDomain user);
        public UserDomain ChangePassword(UserDomain user, string newPassword);
    }
    public class UserServices: IUserServices
    {
        private IUserRepository userRepository;
        public UserServices(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public IEnumerable<UserDomain> GetAll()
        {
            return this.userRepository.GetAll();
        }
        public UserDomain GetById(int id)
        {
            return userRepository.GetById(id);
        }
        public UserDomain Add(UserDomain user)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;
            return this.userRepository.Add(user);
        }
        public UserDomain Update(UserDomain user)
        {
            return this.userRepository.Update(user);
        }
        public bool Delete(int id)
        {
            return this.userRepository.Delete(id);
        }
        public UserDomain Login(UserDomain user)
        {
            if (user == null || user.Email == null)
                return null;
            var existedUser = this.userRepository.GetByEmail(user.Email);
            if (existedUser != null)
            {
                var correctPassword = BCrypt.Net.BCrypt.Verify(user.Password, existedUser.Password);
                if (correctPassword)
                {
                    return existedUser;
                }
                else
                    throw new Exception("Wrong password");
            }
            else throw new Exception("User not existed");
        }
        public UserDomain ChangePassword(UserDomain user,  string newPassword)
        {
            
            var existedUser = this.userRepository.GetById(user.Id);
            if (existedUser != null)
            {
                var correctOldPassword = BCrypt.Net.BCrypt.Verify(user.Password, existedUser.Password);
                if (correctOldPassword)
                {
                    var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                    existedUser.Password = newPasswordHash;
                    return this.userRepository.Update(existedUser);
                }
                else
                    throw new Exception("Wrong old password");
            }
            else return null;
        }
    }
}
