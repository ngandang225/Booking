using Domain.PropertyDomains;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.NeighborhoodMappers;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.Mapping.UserMappers;
using Infrastructure.Mapping.VoucherMappers;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.Net;
namespace Infrastructure.Mapping.PropertyMappers
{
    public interface IPropertyMapper
    {
        public PropertyDomain ToDomain(Property entity);
        public IEnumerable<PropertyDomain> ToDomains(IEnumerable<Property> propertyEntities);
        public Property ToEntity(PropertyDomain domain);


    }
    public class PropertyMapper : IPropertyMapper
    {
        private IUserMapper userMapper;
        private IRoomMapper roomMapper;
        private IFacilityMapper facilityMapper;
        private IVoucherMapper voucherMapper;
        private INeighborhoodMapper neighborhoodMapper;
        public PropertyMapper(IUserMapper userMapper, IRoomMapper roomMapper, IFacilityMapper facilityMapper, IVoucherMapper voucherMapper, INeighborhoodMapper neighborhoodMapper)
        {
            this.userMapper = userMapper;
            this.roomMapper = roomMapper;
            this.facilityMapper = facilityMapper;
            this.voucherMapper = voucherMapper;
            this.neighborhoodMapper = neighborhoodMapper;
        }
        public PropertyDomain ToDomain(Property entity)
        {
            if (entity == null) return null;
            var newDomain = new PropertyDomain();
            newDomain.Name = entity.Name;
            newDomain.Description = entity.Description;
            newDomain.Id = entity.Id;
            newDomain.Address = entity.Address;
            newDomain.Geographycal_Id = entity.Geographycal_Id;
            newDomain.Policy=entity.Policy;
            newDomain.Owner_Id = entity.Owner_Id;
            if(entity.Images != null)
            {
                var entityImages = new List<string>();
                foreach(var image in entity.Images)
                {
                    entityImages.Add(WebUtility.UrlDecode(image));
                }
                newDomain.Images = entityImages;
            }    
            newDomain.IsDeleted = entity.IsDeleted;
            newDomain.Type_Id = entity.Type_Id;
            if (entity.Rooms != null) newDomain.Rooms = roomMapper.ToDomains(entity.Rooms).ToList();

            if (entity.Facilities != null) newDomain.Facilities = facilityMapper.ToDomains(entity.Facilities).ToList();
            if (entity.Vouchers != null) newDomain.Vouchers = voucherMapper.ToDomains(entity.Vouchers).ToList();
            if (entity.Neighborhoods != null) newDomain.Neighborhoods = neighborhoodMapper.ToDomains(entity.Neighborhoods).ToList();
            if (entity.Staff != null) newDomain.Staff = userMapper.ToDomains(entity.Staff).ToList();
            if (entity.Owner != null) newDomain.Owner = userMapper.ToDomain(entity.Owner);
            return newDomain;
        }

        public IEnumerable<PropertyDomain> ToDomains(IEnumerable<Property> propertyEntities)
        {
            if (propertyEntities == null) return null;
            return propertyEntities.Select(entity => ToDomain(entity));
        }

        public Property ToEntity(PropertyDomain domain)
        {
            var newEntity = new Property();
            newEntity.Name = domain.Name;
            newEntity.Description = domain.Description;
            newEntity.Id = domain.Id;
            newEntity.Address = domain.Address;
            newEntity.Geographycal_Id = domain.Geographycal_Id;
            newEntity.Owner_Id= domain.Owner_Id;
            if(domain.Images!=null)
            {
                var domainImages = new List<string>();
                foreach(var image in domain.Images)
                {
                    domainImages.Add(WebUtility.UrlEncode(image));
                }    
                newEntity.Images = domainImages;
            }    
            newEntity.IsDeleted = domain.IsDeleted;
            newEntity.Type_Id = domain.Type_Id;
            return newEntity;
        }
    }
}
