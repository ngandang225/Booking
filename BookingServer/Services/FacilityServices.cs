using Domain.FacilityDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IFacilityServices
    {
        public IEnumerable<FacilityDomain> GetAll();
        public FacilityDomain GetById(int id);
        public FacilityDomain AddFacility(FacilityDomain facility);
        public FacilityDomain UpdateFacility(FacilityDomain facility);
        public bool DeleteFacility(int id);
    }
    public class FacilityServices : IFacilityServices
    {
        private IFacilityRepository facilityRepository;
        public FacilityServices(IFacilityRepository facilityRepository)
        {
            this.facilityRepository = facilityRepository;
        }
        public FacilityDomain AddFacility(FacilityDomain facility)
        {
            return facilityRepository.AddFacility(facility);
        }

        public bool DeleteFacility(int id)
        {
            return (facilityRepository.DeleteFacility(id));
        }

        public IEnumerable<FacilityDomain> GetAll()
        {
            return facilityRepository.GetAll();
        }

        public FacilityDomain GetById(int id)
        {
            return facilityRepository.GetById(id);
        }

        public FacilityDomain UpdateFacility(FacilityDomain facility)
        {
            return facilityRepository.UpdateFacility(facility);
        }
    }
}
