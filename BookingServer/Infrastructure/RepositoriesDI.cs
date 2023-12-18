using Domain.FacilityDomains;
using Domain.GeographycalPlaceDomains;
using Domain.NeighborhoodDomains;
using Domain.OrderDomains;
using Domain.OrderItemDomains;
using Domain.PropertyDomains;
using Domain.PropertyFacilityDomains;
using Domain.PropertyTypeDomains;
using Domain.ReviewDomains;
using Domain.RoomDomains;
using Domain.RoomFacilityDomains;
using Domain.RoomTypeDomains;
using Domain.UserDomains;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RepositoriesDI
    {
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
        {
            services.AddTransient<IGeographycalPlaceRepository, GeographycalPlaceRepository>();
            services.AddTransient<INeighborhoodRepository, NeighborhoodRepository>();
            services.AddTransient<IPropertyTypeRepository, PropertyTypeRepository>();
            services.AddTransient<IPropertyRepository, PropertyRepository>();
            services.AddTransient<IPropertyFacilityRepository, PropertyFacilityRepository>();
            services.AddTransient<IRoomRepository, RoomRepository>();
            services.AddTransient<IRoomTypeRepository, RoomTypeRepository>();
            services.AddTransient<IRoomFacilityRepository, RoomFacilityRepository>();
            services.AddTransient<IFacilityRepository, FacilityRepository>();
            services.AddTransient<IReviewRepository, ReviewRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IOrderRepository,OrderRepository>();
            services.AddTransient<IOrderItemRepository, OrderItemRepository>();
            return services;
        }
    }
}
