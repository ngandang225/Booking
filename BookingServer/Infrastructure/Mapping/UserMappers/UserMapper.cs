using Domain.UserDomains;
using Infrastructure.EntityModels.UserModel;
using Infrastructure.Mapping.OrderMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.UserMappers
{
    public interface IUserMapper
    {
        public UserDomain ToDomain(User entity);
        public IEnumerable<UserDomain> ToDomains(IEnumerable<User> entities);
        public User ToEntity(UserDomain domain);
    }
    public class UserMapper : IUserMapper
    {
        private IOrderMapper orderMapper;
        public UserMapper(IOrderMapper orderMapper)
        {
            this.orderMapper = orderMapper;
        }
        public UserDomain ToDomain(User entity)
        {
            if (entity == null) return null;
            var newDomain = new UserDomain();
            newDomain.Id = entity.Id;
            newDomain.Username = entity.Username;
            newDomain.Password = entity.Password;
            newDomain.Email = entity.Email;
            newDomain.PhoneNumber = entity.PhoneNumber;
            newDomain.Fullname = entity.Fullname;
            newDomain.Address = entity.Address;
            newDomain.Gender = entity.Gender;
            newDomain.Role_id = entity.Role_id;
            if(entity.Orders != null)
            {
                newDomain.Orders = orderMapper.ToDomains(entity.Orders).ToList();
            }    
            return newDomain;
        }

        public IEnumerable<UserDomain> ToDomains(IEnumerable<User> entities)
        {
            if (entities == null) return Enumerable.Empty<UserDomain>();
            return entities.Select(ToDomain);
        }

        public User ToEntity(UserDomain domain)
        {
            var newEntity = new User();
            newEntity.Username = domain.Username;
            newEntity.Password = domain.Password;
            newEntity.Email = domain.Email;
            newEntity.PhoneNumber = domain.PhoneNumber;
            newEntity.Fullname = domain.Fullname;
            newEntity.Address = domain.Address;
            newEntity.Gender = domain.Gender;
            newEntity.Role_id = domain.Role_id;
            return newEntity;
        }
    }
}
