using Domain.AccessPropertyDomains;
using Infrastructure.EntityModels.AccessPropertyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.AccessPropertyMappers
{
    public interface IAccessPropertyMapper
    {
        public AccessPropertyDomain ToDomain(AccessProperty entity);
        public IEnumerable<AccessPropertyDomain> ToDomains(IEnumerable<AccessProperty> entities);
        public AccessProperty ToEntity(AccessPropertyDomain domain);
    }
    public class AccessPropertyMapper : IAccessPropertyMapper
    {
        public AccessPropertyDomain ToDomain(AccessProperty entity)
        {
            if (entity == null) return null;
            var newDomain = new AccessPropertyDomain();
            newDomain.Property_Id = entity.Property_Id;
            newDomain.User_Id = entity.User_Id;
            return newDomain;
        }

        public IEnumerable<AccessPropertyDomain> ToDomains(IEnumerable<AccessProperty> entities)
        {
            if (entities == null) return Enumerable.Empty<AccessPropertyDomain>();
            return entities.Select(ToDomain);
        }

        public AccessProperty ToEntity(AccessPropertyDomain domain)
        {
            var newEntity = new AccessProperty();
            newEntity.Property_Id = domain.Property_Id;
            newEntity.User_Id = domain.User_Id;
            return newEntity;
        }
    }
}
