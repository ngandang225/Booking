using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServicesDI
    {
        public static IServiceCollection AddServicesDI(this IServiceCollection services)
        {
            services.AddTransient<IPropertyTypeService, PropertyTypeServices>();
            services.AddTransient<IGeographycalPlaceServices, GeographycalPlaceServices>();
            services.AddTransient<IPropertyServices, PropertyServices>();
            services.AddTransient<IRoomServices, RoomServices>();
            services.AddTransient<INeighborhoodServices, NeighborhoodServices>();
            services.AddTransient<IRoomTypeServices, RoomTypeServices>();
            services.AddTransient<IRoomFacilityServices, RoomFacilityServices>();
            services.AddTransient<IPropertyFacilityServices, PropertyFacilityServices>();
            services.AddTransient<IReviewServices, ReviewServices>();
            services.AddTransient<IFacilityServices, FacilityServices>();
            services.AddTransient<IUserServices, UserServices>();
            services.AddTransient<IOrderItemServices, OrderItemServices>();
            services.AddTransient<IOrderServices, OrderServices>();
            return services;
        }
    }
}
