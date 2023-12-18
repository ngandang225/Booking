using Domain.ReviewDomains;
using Infrastructure.EntityModels.ReviewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mapping.ReviewMappers
{
    public interface IReviewMapper
    {
        public ReviewDomain ToDomain(Review entity);
        public IEnumerable<ReviewDomain> ToDomains(IEnumerable<Review> entities);
        public Review ToEntity(ReviewDomain domain);
    }
    public class ReviewMapper : IReviewMapper
    {
        public ReviewDomain ToDomain(Review entity)
        {
            if (entity == null) return null;
            var domain = new ReviewDomain();
            domain.Id = entity.Id;
            domain.Room_Id = entity.Room_Id;
            domain.User_Id = entity.User_Id;
            domain.Content = entity.Content;
            domain.Score = entity.Score;
            domain.CreatedAt = entity.CreatedAt;
            return domain;
        }

        public IEnumerable<ReviewDomain> ToDomains(IEnumerable<Review> entities)
        {
            if (entities == null) return null;
            return entities.Select(ToDomain);
        }

        public Review ToEntity(ReviewDomain domain)
        {
            var entity = new Review();
            entity.Id = domain.Id;
            entity.Content = domain.Content;
            entity.User_Id= domain.User_Id;
            entity.Room_Id = domain.Room_Id;
            entity.Score = domain.Score;
            entity.CreatedAt = domain.CreatedAt;
            return entity;  
        }
    }
}
