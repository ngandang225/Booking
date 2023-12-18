using Domain.RoomDomains;
using Infrastructure.EntityModels.RoomModel;
using Infrastructure.Mapping.OrderItemMappers;
using Infrastructure.Mapping.PriceListMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Infrastructure.Mapping.ReviewMappers;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.RoomFacilityMappers;
using Infrastructure.EntityModels.FacilityModel;

namespace Infrastructure.Mapping.RoomMappers
{
    public interface IRoomMapper
    {
        public RoomDomain ToDomain(Room entity);
        public Room ToEntity(RoomDomain domain);
        public IEnumerable<RoomDomain> ToDomains(IEnumerable<Room> entities);
    }
    public class RoomMapper : IRoomMapper
    {
        private IPriceListMapper priceListMapper;
        private IOrderItemMapper orderItemMapper;
        private IReviewMapper reviewMapper;
        private IFacilityMapper facilityMapper;

        public RoomMapper(IPriceListMapper priceListMapper, IOrderItemMapper orderItemMapper, IReviewMapper reviewMapper,IFacilityMapper facilityMapper)
        {
            this.priceListMapper = priceListMapper;
            this.orderItemMapper = orderItemMapper;
            this.reviewMapper = reviewMapper;
            this.facilityMapper = facilityMapper;
        }
        public RoomDomain ToDomain(Room entity)
        {
            if (entity == null) return null;
            var newDomain = new RoomDomain();
            newDomain.Id = entity.Id;
            newDomain.Name = entity.Name;
            newDomain.Room_Number = entity.Room_Number;
            if(entity.Images != null)
            {
                var entityImages = new List<string>();
                foreach (var image in entity.Images)
                {
                    entityImages.Add(WebUtility.UrlDecode(image));
                }
                newDomain.Images = entityImages;
            }    
            newDomain.Area = entity.Area;
            newDomain.Property_Id = entity.Property_Id;
            newDomain.Type_Id = entity.Type_Id;
            newDomain.Description = entity.Description;
            newDomain.Price = entity.Price;
            newDomain.Double_Bed = entity.Double_Bed;
            newDomain.Single_Bed = entity.Single_Bed;
            newDomain.Floor = entity.Floor;
            newDomain.ReviewScore = entity.ReviewScore;
            newDomain.IsDeleted = entity.IsDeleted;
            newDomain.DeletedAt = entity.DeletedAt;
            if(entity.PriceLists != null)
            {
                newDomain.PriceLists = priceListMapper.ToDomains(entity.PriceLists).ToList();
            }
            if (entity.OrderItems != null)
            {
                newDomain.OrderItems = orderItemMapper.ToDomains(entity.OrderItems).ToList();
            }   
            if(entity.Reviews != null)
            {
                newDomain.Reviews = reviewMapper.ToDomains(entity.Reviews).ToList();
            }
            return newDomain;
        }

        public IEnumerable<RoomDomain> ToDomains(IEnumerable<Room> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Room ToEntity(RoomDomain domain)
        {
            var newEntity = new Room();
            newEntity.Room_Number = domain.Room_Number;
            if(domain.Images != null)
            {
                var domainImages = new List<string>();
                foreach (var image in domain.Images)
                {
                    domainImages.Add(WebUtility.UrlEncode(image));
                }
                newEntity.Images = domainImages;
            }
            if(domain.Facilities != null)
            {
                var temp = new List<Facility>();
                foreach(var facility in domain.Facilities)
                {
                    var facilityEntity = facilityMapper.ToEntity(facility);
                    temp.Add(facilityEntity);
                }
                newEntity.Facilities = temp;
            }
            newEntity.IsDeleted = domain.IsDeleted;
            newEntity.DeletedAt = domain.DeletedAt;
            newEntity.Area = domain.Area;
            newEntity.Description = domain.Description;
            newEntity.Price = domain.Price;
            newEntity.Double_Bed = domain.Double_Bed;
            newEntity.Single_Bed = domain.Single_Bed;
            newEntity.Floor = domain.Floor;
            newEntity.Type_Id = domain.Type_Id;
            newEntity.Property_Id = domain.Property_Id;
            newEntity.ReviewScore = domain.ReviewScore;
            return newEntity;
        }
    }
}
