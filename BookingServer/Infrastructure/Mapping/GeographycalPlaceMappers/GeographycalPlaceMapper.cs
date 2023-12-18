using Domain.GeographycalPlaceDomains;
using Infrastructure.EntityModels.GeographycalPlaceModel;
using Infrastructure.Mapping.PropertyMappers;
using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.GeographycalPlaceMappers
{
    public interface IGeographycalPlaceMapper
    {
        public GeographycalPlaceDomain ToDomain(GeographycalPlace geographycalPlaceEnitity);
        public IEnumerable<GeographycalPlaceDomain> ToDomains(IEnumerable<GeographycalPlace> entities);
        public GeographycalPlace ToEntity(GeographycalPlaceDomain domain);
    }
    public class GeographycalPlaceMapper : IGeographycalPlaceMapper
    {
        private IPropertyMapper propertyMapper;
        public GeographycalPlaceMapper(IPropertyMapper propertyMapper)
        {
            this.propertyMapper = propertyMapper;
        }
        public GeographycalPlaceDomain ToDomain(GeographycalPlace geographycalPlaceEnitity)
        {
            if (geographycalPlaceEnitity == null) return null;
            var newDomain = new GeographycalPlaceDomain();
            newDomain.Name = geographycalPlaceEnitity.Name;
            newDomain.Id = geographycalPlaceEnitity.Id;
            newDomain.Center_Location = geographycalPlaceEnitity.Center_Location;
            newDomain.Thumbnail = WebUtility.UrlDecode(geographycalPlaceEnitity.Thumbnail);
            if (geographycalPlaceEnitity.Properties != null)
            {
                newDomain.Properties = propertyMapper.ToDomains(geographycalPlaceEnitity.Properties).ToList();
            }
            return newDomain;
        }

        public IEnumerable<GeographycalPlaceDomain> ToDomains(IEnumerable<GeographycalPlace> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public GeographycalPlace ToEntity(GeographycalPlaceDomain domain)
        {
            var entity = new GeographycalPlace();
            entity.Thumbnail = domain.Thumbnail;
            entity.Name = domain.Name;
            entity.Id = domain.Id;
            entity.Center_Location = domain.Center_Location;
            return entity;
        }
    }
}
