using Domain.ReviewDomains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IReviewServices
    {
        public IEnumerable<ReviewDomain> GetAll();
        public IEnumerable<ReviewDomain> GetByRoomId( int roomId);
        public ReviewDomain Add(ReviewDomain reviewDomain);
        public ReviewDomain Update(ReviewDomain reviewDomain);
        public bool Delete(int id);
    }
    public class ReviewServices : IReviewServices
    {
        private IReviewRepository reviewRepository;
        public ReviewServices(IReviewRepository reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }

        public ReviewDomain Add(ReviewDomain reviewDomain)
        {
            return reviewRepository.Add(reviewDomain);
        }

        public bool Delete(int id)
        {
            return reviewRepository.Delete(id);
        }

        public IEnumerable<ReviewDomain> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ReviewDomain> GetByRoomId(int roomId)
        {
            return reviewRepository.GetByRoomId(roomId);
        }

        public ReviewDomain Update(ReviewDomain reviewDomain)
        {
            return reviewRepository.Update(reviewDomain);
        }
    }
}
