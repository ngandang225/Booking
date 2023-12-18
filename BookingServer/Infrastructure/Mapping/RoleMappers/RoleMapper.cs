using Domain.RoleDomains;
using Infrastructure.EntityModels.RoleModel;
using Infrastructure.Mapping.UserMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.RoleMappers
{
    public interface IRoleMapper
    {
        public RoleDomain ToDomain(Role entity);
        public IEnumerable<RoleDomain> ToDomains(IEnumerable<Role> entities);
        public Role ToEntity(RoleDomain domain);
    }
    public class RoleMapper : IRoleMapper
    {
        private IUserMapper userMapper;
        public RoleMapper(IUserMapper userMapper)
        {
            this.userMapper = userMapper;
        }
        public RoleDomain ToDomain(Role entity)
        {
            if (entity == null) return null;
            var newDomain = new RoleDomain();
            newDomain.Name = entity.Name;
            newDomain.Id = entity.Id;
            if(entity.Users!=null)
            {
                newDomain.Users = userMapper.ToDomains(entity.Users).ToList();
            }    
            return newDomain;
        }

        public IEnumerable<RoleDomain> ToDomains(IEnumerable<Role> entities)
        {
            if (entities == null) return Enumerable.Empty<RoleDomain>();
            return entities.Select(ToDomain);
        }

        public Role ToEntity(RoleDomain domain)
        {
            var newEntity = new Role();
            newEntity.Name = domain.Name;
            newEntity.Id = domain.Id;
            return newEntity;
        }
    }
}
