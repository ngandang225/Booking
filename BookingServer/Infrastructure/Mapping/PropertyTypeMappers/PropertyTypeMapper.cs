using Domain.PropertyTypeDomains;
using Infrastructure.EntityModels.PropertyTypeModel;
using Infrastructure.Mapping.PropertyMappers;
using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.PropertyTypeMappers
{
    public interface IPropertyTypeMapper
    {
        public PropertyTypeDomain ToDomain(PropertyType propertyTypeEntity);
        public IEnumerable<PropertyTypeDomain> ToDomains(IEnumerable<PropertyType> entities);
        public PropertyType ToEntity(PropertyTypeDomain propertyType);
    }
    public class PropertyTypeMapper : IPropertyTypeMapper
    {
        private IPropertyMapper propertyMapper;
        public PropertyTypeMapper(IPropertyMapper propertyMapper)
        {
            this.propertyMapper = propertyMapper;
        }
        public PropertyTypeDomain ToDomain(PropertyType propertyTypeEntity)
        {
            var newDomain = new PropertyTypeDomain();
            newDomain.Name = propertyTypeEntity.Name;
            newDomain.Thumbnail = WebUtility.UrlDecode(propertyTypeEntity.Thumbnail);
            newDomain.Id = propertyTypeEntity.Id;
            if (propertyTypeEntity.Properties != null)
            {
                newDomain.Properties = propertyMapper.ToDomains(propertyTypeEntity.Properties).ToList();
            }
            return newDomain;
        }

        public IEnumerable<PropertyTypeDomain> ToDomains(IEnumerable<PropertyType> entities)
        {
            if(entities == null) return Enumerable.Empty<PropertyTypeDomain>();
            return entities.Select(ToDomain);
        }

        public PropertyType ToEntity(PropertyTypeDomain propertyType)
        {
            var propertyTypeEntity = new PropertyType();
            propertyTypeEntity.Name = propertyType.Name;
            propertyTypeEntity.Thumbnail = propertyType.Thumbnail;
            propertyTypeEntity.Id = propertyTypeEntity.Id;
            return propertyTypeEntity;
        }
    }
}
