using Domain.ReviewDomains;
using Infrastructure.Mapping.ReviewMappers;
using Infrastructure.Mapping.RoleMappers;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.Mapping.UserMappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private IReviewMapper reviewMapper;
        private IUserMapper userMapper;
        private IRoomMapper roomMapper;
        CoreContext coreContext;
        public ReviewRepository(IReviewMapper reviewMapper, IUserMapper userMapper, IRoomMapper roomMapper, CoreContext coreContext)
        {
            this.reviewMapper = reviewMapper;
            this.userMapper = userMapper;
            this.roomMapper = roomMapper;
            this.coreContext = coreContext;
        }

        public ReviewDomain Add(ReviewDomain reviewDomain)
        {
            var reviewDoc = coreContext.Reviews
                .Include(r => r.User)
                .Include(r => r.Room)
                .FirstOrDefault(r => r.Id == reviewDomain.Id);
            if (reviewDoc == null)
            {
                var entity = reviewMapper.ToEntity(reviewDomain);
                coreContext.Reviews.Add(entity);
                coreContext.SaveChanges();
                var domain = reviewMapper.ToDomain(entity);
                if(entity.User != null)
                {
                    domain.User = userMapper.ToDomain(entity.User);
                    domain.Room = roomMapper.ToDomain(entity.Room);
                }
                return domain;
            }
            else
            {
                return null;
            }    
        }

        public bool Delete(int id)
        {
            var reviewDoc = coreContext.Reviews
               .Include(r => r.User)
               .Include(r => r.Room)
               .FirstOrDefault(r => r.Id == id);
            if(reviewDoc == null)
            { return false; }
            else
            {
                coreContext.Reviews.Remove(reviewDoc);
                coreContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<ReviewDomain> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ReviewDomain> GetByRoomId( int roomId)
        {
            var entities = coreContext.Reviews.Where(r => r.Room_Id == roomId);
            var domains = reviewMapper.ToDomains(entities);
            return domains;

        }

        public ReviewDomain Update(ReviewDomain reviewDomain)
        {
            var reviewDoc = coreContext.Reviews
               .Include(r => r.User)
               .Include(r => r.Room)
               .FirstOrDefault(r => r.Id==reviewDomain.Id);
            if (reviewDoc == null) return null;
            else
            {
                var entity = reviewMapper.ToEntity(reviewDomain);
                reviewDoc.Update(entity);
                coreContext.SaveChanges();
                var domain = reviewMapper.ToDomain(reviewDoc);
                if (entity.User != null)
                {
                    domain.User = userMapper.ToDomain(entity.User);
                    domain.Room = roomMapper.ToDomain(entity.Room);
                }
                return domain;
            }
        }
    }
}
