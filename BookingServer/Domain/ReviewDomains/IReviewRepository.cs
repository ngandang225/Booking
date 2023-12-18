using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ReviewDomains
{
    public interface IReviewRepository
    {
        public IEnumerable<ReviewDomain> GetAll();
        public IEnumerable<ReviewDomain> GetByRoomId(int roomId);
        public ReviewDomain Add(ReviewDomain reviewDomain);
        public ReviewDomain Update(ReviewDomain reviewDomain);
        public bool Delete(int id);
    }
}
