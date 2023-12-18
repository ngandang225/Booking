using Infrastructure.Mapping.AccessPropertyMappers;
using Infrastructure.Mapping.FacilityMappers;
using Infrastructure.Mapping.GeographycalPlaceMappers;
using Infrastructure.Mapping.NeighborhoodMappers;
using Infrastructure.Mapping.NeighborhoodPropertyMappers;
using Infrastructure.Mapping.OrderItemMappers;
using Infrastructure.Mapping.OrderMappers;
using Infrastructure.Mapping.PriceListMappers;
using Infrastructure.Mapping.PropertyFacilityMappers;
using Infrastructure.Mapping.PropertyMappers;
using Infrastructure.Mapping.PropertyTypeMappers;
using Infrastructure.Mapping.ReviewMappers;
using Infrastructure.Mapping.RoleMappers;
using Infrastructure.Mapping.RoomFacilityMappers;
using Infrastructure.Mapping.RoomMappers;
using Infrastructure.Mapping.RoomTypeMappers;
using Infrastructure.Mapping.UserMappers;
using Infrastructure.Mapping.VoucherMappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MapperDI
    {
        public static IServiceCollection AddMapperServices(this IServiceCollection services)
        {
            services.AddTransient<IPropertyMapper, PropertyMapper>();
            services.AddTransient<IPropertyTypeMapper, PropertyTypeMapper>();
            services.AddTransient<IPropertyFacilityMapper, PropertyFacilityMapper>();
            services.AddTransient<INeighborhoodMapper, NeighborhoodMapper>();
            services.AddTransient<IGeographycalPlaceMapper, GeographycalPlaceMapper>();
            services.AddTransient<IVoucherMapper, VoucherMapper>();
            services.AddTransient<IAccessPropertyMapper, AccessPropertyMapper>();
            services.AddTransient<IFacilityMapper, FacilityMapper>();
            services.AddTransient<INeighborhoodPropertyMapper, NeighborhoodPropertyMapper>();
            services.AddTransient<IOrderItemMapper, OrderItemMapper>();
            services.AddTransient<IOrderMapper, OrderMapper>();
            services.AddTransient<IPriceListMapper, PriceListMapper>();
            services.AddTransient<IRoleMapper, RoleMapper>();
            services.AddTransient<IRoomFacilityMapper, RoomFacilityMapper>();
            services.AddTransient<IRoomMapper, RoomMapper>();
            services.AddTransient<IRoomTypeMapper, RoomTypeMapper>();
            services.AddTransient<IUserMapper, UserMapper>();
            services.AddTransient<IReviewMapper, ReviewMapper>();
            return services;
        }
    }
}
