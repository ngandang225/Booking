using Domain.UserDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Mapping.UserMappers;
using Infrastructure.EntityModels.UserModel;
using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.RoomModel;
using Microsoft.EntityFrameworkCore;
using Infrastructure.EntityModels.OrderModel;
using Domain.RoomDomains;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.EntityModels.OrderItemModel;
using Domain.OrderDomains;
using Domain.OrderItemDomains;
using Domain.PropertyDomains;
using Infrastructure.Mapping.PropertyMappers;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private CoreContext coreContext;
        private IUserMapper userMapper;
        private IRoomMapper roomMapper;
        private IPropertyMapper propertyMapper;
        public UserRepository(CoreContext coreContext, IUserMapper userMapper, IRoomMapper roomMapper, IPropertyMapper propertyMapper) { 
            this.coreContext = coreContext;
            this.userMapper = userMapper;
            this.roomMapper = roomMapper;
            this.propertyMapper = propertyMapper;
        }
        public IEnumerable<UserDomain> GetAll()
        {
            List<User> users = this.coreContext.Users.ToList();
            List<UserDomain> usersDomain = this.userMapper.ToDomains(users).ToList();
            return usersDomain;

        }
        public UserDomain GetById(int userId)
        {
            var user = this.coreContext.Users
                .Include(u => u.Orders)
                    .ThenInclude(o => o.OrderItems)
                .Where(user => user.Id == userId).FirstOrDefault();
            if (user != null)
            {
                UserDomain userDomain = this.userMapper.ToDomain(user);
                return userDomain;
            } else
                return null;
        }
        public UserDomain GetByEmail(string email)
        {
            var user = this.coreContext.Users.Where(user => user.Email == email).FirstOrDefault();
            
            if (user != null)
            {
                UserDomain userDomain = this.userMapper.ToDomain(user);
                return userDomain;
            }
            else
                return null;
        }
        public UserDomain Add(UserDomain userDomain)
        {
            var users = this.coreContext.Users.Where(user => user.Email == userDomain.Email).ToList();
            if (users != null && users.Count>0)
            {
                throw new Exception("User existed");
            }
                User user = this.userMapper.ToEntity(userDomain);
                this.coreContext.Add(user);
                this.coreContext.SaveChanges();
                UserDomain newUser = this.userMapper.ToDomain(user);
                return newUser;
    
        }
        public UserDomain Update(UserDomain userDomain)
        {
            var user = this.coreContext.Users.Where(user => user.Id == userDomain.Id).FirstOrDefault();
            if (user != null)
            {
                var entityUser = this.userMapper.ToEntity(userDomain);
                user.Update(entityUser);
                this.coreContext.SaveChanges();
                var newUser = this.userMapper.ToDomain(user);
                return newUser;
            }
            else return null;
        }
        public bool Delete(int userId)
        {
            var user = coreContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                return false;
            }
            else
            {
                coreContext.Users.Remove(user);
                coreContext.SaveChanges();
                return true;
            }
        }
    }
}
