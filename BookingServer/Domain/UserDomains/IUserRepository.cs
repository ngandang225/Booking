using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UserDomains
{
    public interface IUserRepository
    {
        public IEnumerable<UserDomain> GetAll();
        public UserDomain GetById(int userId);
        public UserDomain GetByEmail(string email);
        public UserDomain Add(UserDomain user);
        public UserDomain Update(UserDomain user);
        public bool Delete(int userId);
    }
}
