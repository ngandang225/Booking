using Ardalis.Specification;
using Domain.PropertyDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.EntityModels.PropertyModel
{
    public class PropertySpecifiaction : Specification<Property>
    {
        public PropertySpecifiaction(PropertyFilter filter = null, PropertySort sort = null, PropertyPagination pagination = null, PropertySearch search = null)
        {
            Query.Where(p => p.IsDeleted == false);
            Query.Include(p => p.Rooms).ThenInclude(r => r.OrderItems);
            Query.Include(p => p.Rooms).ThenInclude(r => r.Reviews);
            Query.Include(p => p.Rooms).ThenInclude(r => r.Facilities);
            Query.Include(p => p.Owner).Include(p => p.Staff).Include(p => p.Facilities).Include(p => p.GeographycalPlace).Include(p=> p.Neighborhoods);
            if (search != null)
            {
                if (search.Geographycal_Id != null)
                {
                    Query.Where(p => p.Geographycal_Id == search.Geographycal_Id);
                }
                if (search.CheckInDate != null && search.CheckOutDate != null)
                {
                    Query.Include(p => p.Rooms).ThenInclude(r => r.OrderItems).Where(p => p.Rooms.Any(r =>  r.OrderItems.Count ==0 ?true: r.OrderItems.Any(oi => oi.Order.Check_In_Date >= search.CheckOutDate || oi.Order.Check_Out_Date <= search.CheckInDate)));
                }
                if (search.PeopleNum != null)
                {
                    Query.Include(p => p.Rooms).Where(p => p.Rooms.Sum(r => ((r.Double_Bed) * 2 + (r.Single_Bed))) >= search.PeopleNum);
                }    

            }
            if (filter != null)
            {
                if (filter.Id != 0 && filter.Id!=null)
                {
                    Query.Where(p => p.Id == filter.Id);
                }
                if (filter.PriceFrom != null && filter.PriceTo != null)
                {
                    Query.Where(p => p.Rooms.Any(r => r.Price >= filter.PriceFrom && r.Price <= filter.PriceTo));
                }
                if (filter.TypeIds != null)
                {
                    Query.Where(p => filter.TypeIds.Any(t => t == p.Type_Id.Value));
                }
                if (filter.RoomFacilityIds != null)
                {
                    Query.Include(p => p.Rooms).ThenInclude(r=> r.Facilities).Where(p => p.Rooms.Any(r => r.Facilities.Any(f => filter.RoomFacilityIds.Contains(f.Id))));
                }
                if(filter.FacilityIds != null)
                {
                    Query.Include(p => p.Facilities).Where(p => p.Facilities.Any(f => filter.FacilityIds.Contains(f.Id)));
                }    
                if(filter.ReviewRate != null)
                {
                    Query.Include(p => p.Rooms).ThenInclude(r => r.Reviews).Where(p => p.Rooms.Any(r => r.Reviews.Any(re => re.Score == filter.ReviewRate)));
                }
                if (filter.TypeIds != null)
                {
                    Query.Where(p => filter.TypeIds.Any(t => t == p.Type_Id.Value));
                }
                if (filter.NeighborhoodIds != null)
                {
                    Query.Include(p => p.Neighborhoods).Where(p => p.Neighborhoods.Any(n => filter.NeighborhoodIds.Contains(n.Id)));
                }
            }
            
            if (pagination != null)
            {
                Query.Skip((pagination.PageIndex.Value - 1) * pagination.PageSize.Value).Take(pagination.PageSize.Value);
            }
        }
    }
}
