using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FacilityDomains
{
    public interface IFacilityRepository
    {
        public IEnumerable<FacilityDomain> GetAll();
        public FacilityDomain GetById(int id);
        public FacilityDomain AddFacility(FacilityDomain facility);
        public FacilityDomain UpdateFacility(FacilityDomain facility);
        public bool DeleteFacility(int id);
    }
}
