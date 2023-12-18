using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.GeographycalPlaceDomains
{
    public interface IGeographycalPlaceRepository
    {
        public IEnumerable<GeographycalPlaceDomain> GetAll();
        public GeographycalPlaceDomain GetById(int id);
        public GeographycalPlaceDomain Add(GeographycalPlaceDomain geographycalPlace);
        public GeographycalPlaceDomain Update(GeographycalPlaceDomain geographycalPlace);
        public void Delete(int id);
    }
}
