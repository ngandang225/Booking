using Domain.PriceListDomains;
using Infrastructure.EntityModels.PriceListModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.PriceListMappers
{
    public interface IPriceListMapper
    {
        public PriceListDomain ToDomain(PriceList entity);
        public IEnumerable<PriceListDomain> ToDomains(IEnumerable<PriceList> entities);
        public PriceList ToEntity(PriceListDomain domain);
    }
    public class PriceListMapper : IPriceListMapper
    {
        public PriceListDomain ToDomain(PriceList entity)
        {
            if (entity == null) return null;
            var newDomain = new PriceListDomain();
            newDomain.Id = entity.Id;
            newDomain.Room_Id = entity.Room_Id;
            newDomain.Value = entity.Value;
            newDomain.Close_Date = entity.Close_Date;
            newDomain.Open_Date = entity.Open_Date;
            newDomain.Price = entity.Price;
            return newDomain;
        }

        public IEnumerable<PriceListDomain> ToDomains(IEnumerable<PriceList> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public PriceList ToEntity(PriceListDomain domain)
        {
            var newEntity = new PriceList();
            newEntity.Room_Id = domain.Room_Id;
            newEntity.Value = domain.Value;
            newEntity.Price = domain.Price;
            newEntity.Open_Date = domain.Open_Date;
            newEntity.Close_Date = domain.Close_Date;
            return newEntity;
        }
    }
}
