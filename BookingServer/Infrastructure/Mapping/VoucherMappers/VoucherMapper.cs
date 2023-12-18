using Domain.VoucherDomains;
using Infrastructure.EntityModels.VoucherModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.VoucherMappers
{
    public interface IVoucherMapper
    {
        public VoucherDomain ToDomain(Voucher entity);
        public IEnumerable<VoucherDomain> ToDomains(IEnumerable<Voucher> entities);
        public Voucher ToEntity(VoucherDomain domain);
    }
    public class VoucherMapper : IVoucherMapper
    {
        public VoucherDomain ToDomain(Voucher entity)
        {
            if (entity == null) return null;
            var newDomain = new VoucherDomain();
            newDomain.Id = entity.Id;
            newDomain.Percentage = entity.Percentage;
            newDomain.Open_Date = entity.Open_Date;
            newDomain.Close_Date = entity.Close_Date;
            newDomain.Name = entity.Name;
            newDomain.Scope = entity.Scope;
            return newDomain;
        }

        public IEnumerable<VoucherDomain> ToDomains(IEnumerable<Voucher> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Voucher ToEntity(VoucherDomain domain)
        {
            var newEntity = new Voucher();
            newEntity.Name = domain.Name;
            newEntity.Scope = domain.Scope;
            newEntity.Percentage = domain.Percentage;
            newEntity.Open_Date = domain.Open_Date;
            newEntity.Close_Date = domain.Close_Date;
            return newEntity;
        }
    }
}
