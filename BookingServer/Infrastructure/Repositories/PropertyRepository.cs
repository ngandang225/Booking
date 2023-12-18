using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Domain.FacilityDomains;
using Domain.PropertyDomains;
using Domain.PropertyTypeDomains;
using Domain.RoomDomains;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.PropertyTypeModel;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.GeographycalPlaceMappers;
using Infrastructure.Mapping.PropertyMappers;
using Infrastructure.Mapping.PropertyTypeMappers;
using Infrastructure.Mapping.ReviewMappers;
using Infrastructure.Mapping.RoleMappers;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.Mapping.UserMappers;
using Infrastructure.Mapping.RoomTypeMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private CoreContext _coreContext;
        private IPropertyMapper _propertyMapper;
        private IFacilityMapper facilityMapper;
        private IRoomMapper roomMapper;
        private IReviewMapper reviewMapper;
        private IGeographycalPlaceMapper geographycalPlaceMapper;
        private IPropertyTypeMapper propertyTypeMapper;
        private IRoomTypeMapper roomTypeMapper;
        public PropertyRepository(CoreContext coreContext, IPropertyMapper propertyMapper, IFacilityMapper facilityMapper,IRoomMapper roomMapper,IReviewMapper reviewMapper,IRoomTypeMapper roomTypeMapper, IPropertyTypeMapper propertyTypeMapper, IGeographycalPlaceMapper geographycalPlaceMapper)
        {
            _coreContext = coreContext;
            _propertyMapper = propertyMapper;
            this.facilityMapper = facilityMapper;
            this.roomMapper = roomMapper;
            this.reviewMapper = reviewMapper;
            this.roomTypeMapper=roomTypeMapper;
            this.geographycalPlaceMapper = geographycalPlaceMapper;
            this.propertyTypeMapper = propertyTypeMapper;
        }

        public PropertyDomain AddProperty(PropertyDomain property)
        {
            var properties = _coreContext.Properties.Where(p => p.Name == property.Name).ToList();
            if (properties != null && properties.Count > 0 )
            {
                throw new Exception("Property existed");
            }

            Property propertyEntity = _propertyMapper.ToEntity(property);
            _coreContext.Add(propertyEntity);
            _coreContext.SaveChanges();
            PropertyDomain newProperty = _propertyMapper.ToDomain(propertyEntity);
            return newProperty;
        }

        public bool DeleteProperty(int id)
        {
            var entity = _coreContext.Properties.FirstOrDefault(p => p.Id == id);
            if (entity == null)
            {
                return false;
            }
            _coreContext.Properties.Remove(entity);
            _coreContext.SaveChanges();
            return true;
        }

        public PropertyDomain GetById(int id)
        {
            var entity = _coreContext.Properties.Include(p => p.PropertyType).Include(p => p.GeographycalPlace).Include(p => p.Rooms).ThenInclude(r => r.Facilities).Include(p => p.Rooms).ThenInclude(r => r.Reviews).Include(p => p.Owner).Include(p => p.Facilities).Include(p => p.GeographycalPlace).FirstOrDefault(p => p.Id == id && (!p.IsDeleted.Value));

            if (entity == null)
                return null;
            var domain = _propertyMapper.ToDomain(entity);
            var Rooms = new List<RoomDomain>();
            foreach (var room in entity.Rooms)
            {
                var roomDomain = roomMapper.ToDomain(room);
                if(roomDomain.IsDeleted !=null && roomDomain.IsDeleted!=true)
                {
                    if (room.Facilities != null)
                    {

                        roomDomain.Facilities = facilityMapper.ToDomains(room.Facilities).ToList();
                    }
                }
                if (room.Reviews != null)
                {
                    roomDomain.Reviews = reviewMapper.ToDomains(room.Reviews).ToList();
                }
                    if (room.RoomType != null)
                    {
                        roomDomain.RoomType = roomTypeMapper.ToDomain(room.RoomType);
                    }
                    Rooms.Add(roomDomain);
            }
            if (entity.GeographycalPlace != null) { 
                domain.GeographycalPlace = new Domain.GeographycalPlaceDomains.GeographycalPlaceDomain(); 
                domain.GeographycalPlace.Name = entity.GeographycalPlace.Name; 
                domain.GeographycalPlace.Id = entity.GeographycalPlace.Id; 
            }
            if (entity.PropertyType != null) { 
                domain.PropertyType = new Domain.PropertyTypeDomains.PropertyTypeDomain(); 
                domain.PropertyType.Name = entity.PropertyType.Name; 
                domain.PropertyType.Id = entity.PropertyType.Id; 
            }
            domain.Rooms = Rooms;
            return domain;
        }

        public IEnumerable<PropertyDomain> GetAllByUserId(int userId)
        {
            var entities = _coreContext.Properties
                .Where(p => p.Owner_Id == userId && p.IsDeleted == false)
                .Include(p => p.Rooms)
                    .ThenInclude(r => r.OrderItems)
                .Include(p => p.PropertyType)
                .Include(p => p.Staff)
                .ToList();

            var domains = new List<PropertyDomain>();

            foreach (var entity in entities)
            {
                var domain = _propertyMapper.ToDomain(entity);

                if (entity.PropertyType != null)
                {
                    domain.PropertyType = new PropertyTypeDomain();
                    domain.PropertyType.Id = entity.PropertyType.Id;
                    domain.PropertyType.Name = entity.PropertyType.Name;
                }
                domains.Add(domain);
            }
            return domains;
        }
        public IEnumerable<PropertyDomain> GetProperties(PropertySearch search, PropertyFilter filter, PropertySort sort, PropertyPagination pagination)
        {
            var specification = new PropertySpecifiaction(filter, sort, pagination, search);
            var entites = _coreContext.Properties.WithSpecification(specification);
            if (sort != null)
            {
                if (sort.SortBy == "toppick")
                {
                    if (sort.IsAscending == false)
                    {
                        var sorted = entites.ToList();
                        sorted = sorted.OrderByDescending(p => p.Rooms.Sum(r => r.OrderItems.Count)).ToList();
                        entites = sorted.AsQueryable();
                    }
                    else
                    {
                        var sorted = entites.ToList();
                        sorted = sorted.OrderBy(p => p.Rooms.Sum(r => r.OrderItems.Count)).ToList();
                        entites = sorted.AsQueryable();
                    }

                }
                if (sort.SortBy == "ratingDesc")
                {
                    if (sort.IsAscending == false)
                    {
                        var sorted = entites.ToList();
                        sorted = sorted.OrderByDescending(p => p.Rooms.Sum(r => r.Reviews.Sum(re => re.Score))).ToList();
                        entites = sorted.AsQueryable();
                    }
                    else
                    {
                        var sorted = entites.ToList();
                        sorted = sorted.OrderBy(p => p.Rooms.Sum(r => r.Reviews.Sum(re => re.Score))).ToList();
                        entites = sorted.AsQueryable();
                    }

                }
            }
            var result = _propertyMapper.ToDomains(entites);

            return result;
        }

        public PropertyDomain UpdateProperty(PropertyDomain property)
        {
            var entity = _coreContext.Properties.FirstOrDefault(p => p.Id == property.Id);
            if (entity == null) return null;
            var updateEntity = _propertyMapper.ToEntity(property);
            entity.Update(updateEntity);
            _coreContext.SaveChanges();
            return _propertyMapper.ToDomain(entity);
        }
    }
}
