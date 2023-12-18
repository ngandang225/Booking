using Domain.FacilityDomains;
using Domain.PropertyFacilityDomains;
using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.PropertyFacilityModel;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.PropertyFacilityMappers;
using Infrastructure.Mapping.PropertyMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PropertyFacilityRepository : IPropertyFacilityRepository
    {
        private CoreContext coreContext;
        private IPropertyMapper propertyMapper;
        private IFacilityMapper facilityMapper;
        private IPropertyFacilityMapper propertyFacilityMapper;
        public PropertyFacilityRepository(CoreContext coreContext, IPropertyMapper propertyMapper, IFacilityMapper facilityMapper, IPropertyFacilityMapper propertyFacilityMapper)
        {
            this.coreContext = coreContext;
            this.propertyMapper = propertyMapper;
            this.facilityMapper = facilityMapper;
            this.propertyFacilityMapper = propertyFacilityMapper;
        }
        public PropertyFacilityDomain Add(PropertyFacilityDomain propertyFacility)
        {
            var pfDoc = coreContext.PropertyFacilities
                //.Include(pf => pf.Property)
                //.Include(pf => pf.Facility)
                .FirstOrDefault(pf => pf.Property_Id == propertyFacility.Property_Id && pf.Facility_Id == propertyFacility.Facility_Id);
            if (pfDoc == null)
            {
                var entity = propertyFacilityMapper.ToEntity(propertyFacility);
                coreContext.PropertyFacilities.Add(entity);
                coreContext.SaveChanges();
                var domain = propertyFacilityMapper.ToDomain(entity);
                //if(entity.Property != null)
                //{
                //    domain.Property = propertyMapper.ToDomain(entity.Property);
                //}
                //if(entity.Facility != null)
                //{
                //    domain.Facility = facilityMapper.ToDomain(entity.Facility);
                //}
                return domain;
            }
            else
            {
                return null;
            }
        }

        public bool Delete(int facilityId, int propertyId)
        {
            var pfDoc = coreContext.PropertyFacilities
                //.Include(pf => pf.Property)
                //.Include(pf => pf.Facility)
                .FirstOrDefault(pf => pf.Property_Id == propertyId && pf.Facility_Id == facilityId);
            if (pfDoc == null)
            {
                return false;
            }
            else
            {
                coreContext.PropertyFacilities.Remove(pfDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public PropertyFacilityDomain Get(int facilityId, int propertyId)
        {
            var entity = coreContext.PropertyFacilities
                .Include(pf => pf.Property)
                .Include(pf => pf.Facility)
                .FirstOrDefault(pf => pf.Property_Id == propertyId && pf.Facility_Id == facilityId);
            var domain = propertyFacilityMapper.ToDomain(entity);
            if (entity.Property != null)
            {
                domain.Property = propertyMapper.ToDomain(entity.Property);
            }
            if (entity.Facility != null)
            {
                domain.Facility = facilityMapper.ToDomain(entity.Facility);
            }
            return domain;
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            var entities = coreContext.PropertyFacilities
                .Include(pf => pf.Facility).GroupBy(pf =>pf.Facility_Id);
            var facilities = new List<Facility>();
            foreach(var entity in entities )
            {
                var facility = entity.FirstOrDefault();
                if(facility != null)
                {
                    facilities.Add(facility.Facility);
                }    
            }    
            //foreach (var entity in entities)
            //{
            //    var domain = propertyFacilityMapper.ToDomain(entity);
            //    if (entity.Property != null)
            //    {
            //        domain.Property = propertyMapper.ToDomain(entity.Property);
            //    }
            //    if (entity.Facility != null)
            //    {
            //        domain.Facility = facilityMapper.ToDomain(entity.Facility);
            //    }
            //    domains.Add(domain);
            //}
            return facilityMapper.ToDomains(facilities);
        }

        public PropertyFacilityDomain Update(PropertyFacilityDomain propertyFacility)
        {
            var pfDoc = coreContext.PropertyFacilities
                //.Include(pf => pf.Property)
                //.Include(pf => pf.Facility)
                .FirstOrDefault(pf => pf.Property_Id == propertyFacility.Property_Id && pf.Facility_Id == propertyFacility.Facility_Id);
            if (pfDoc != null)
            {
                var entity = propertyFacilityMapper.ToEntity(propertyFacility);
                pfDoc.Update(entity);
                coreContext.SaveChanges();
                var domain = propertyFacilityMapper.ToDomain(pfDoc);
                //if (entity.Property != null)
                //{
                //    domain.Property = propertyMapper.ToDomain(pfDoc.Property);
                //}
                //if (entity.Facility != null)
                //{
                //    domain.Facility = facilityMapper.ToDomain(pfDoc.Facility);
                //}
                return domain;
            }
            else
            {
                return null;
            }
        }
    }
}
