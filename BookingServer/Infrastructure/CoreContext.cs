using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.EntityModels.AccessPropertyModel;
using Infrastructure.EntityModels.FacilityModel;
using Infrastructure.EntityModels.GeographycalPlaceModel;
using Infrastructure.EntityModels.NeighborhoodModel;
using Infrastructure.EntityModels.NeighborhoodPropertyModel;
using Infrastructure.EntityModels.OrderItemModel;
using Infrastructure.EntityModels.OrderModel;
using Infrastructure.EntityModels.PriceListModel;
using Infrastructure.EntityModels.PropertyFacilityModel;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.PropertyTypeModel;
using Infrastructure.EntityModels.RoleModel;
using Infrastructure.EntityModels.RoomFacilityModel;
using Infrastructure.EntityModels.RoomModel;
using Infrastructure.EntityModels.RoomTypeModel;
using Infrastructure.EntityModels.UserModel;
using Infrastructure.EntityModels.VoucherModel;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using Infrastructure.EntityModels.ReviewModel;

namespace Infrastructure
{
    public class CoreContext: DbContext
    {
        public CoreContext(DbContextOptions<CoreContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<GeographycalPlace> GeographycalPlaces { get; set; }
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<PriceList> PriceLists { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<PropertyFacility> PropertyFacilities { get; set; }
        public DbSet<RoomFacility> RoomsFacility { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<AccessProperty> AccessProperties { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Neighborhood> Neighborhoods { get; set; }
        public DbSet<NeighborhoodProperty> NeighborhoodProperties { get; set; }
        public DbSet<Review> Reviews { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //User
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<User>(eb =>
            {
                eb.Property(u => u.Username).HasColumnType("varchar(50)");
                eb.Property(u => u.Password).HasColumnType("varchar(200)");
                eb.Property(u => u.Gender).HasColumnType("varchar(5)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(u => u.Fullname).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(u => u.Address).HasColumnType("varchar(100)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(u => u.Email).HasColumnType("varchar(250)");
            });
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.Role_id)
                .IsRequired();
            modelBuilder.Entity<User>()
                .HasMany(u => u.AccessProperties)
                .WithMany(p => p.Staff)
                .UsingEntity<AccessProperty>(
                l => l.HasOne<Property>().WithMany().HasForeignKey(e => e.Property_Id),
            r => r.HasOne<User>().WithMany().HasForeignKey(e => e.User_Id));
            modelBuilder.Entity<User>()
                .HasMany(u => u.Properties)
                .WithOne(p => p.Owner)
                .HasForeignKey(p => p.Owner_Id);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.User_Id);
            //Access Property
            modelBuilder.Entity<AccessProperty>().ToTable("AccessProperties");
            //Order
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<Order>(eb =>
            {
                eb.Property(u => u.Status).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode(); 
                eb.Property(u => u.Customer_Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(u => u.Email).HasColumnType("varchar(50)");
            });
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(o => o.Order)
                .HasForeignKey(o => o.Order_Id).OnDelete(DeleteBehavior.NoAction);
            //Role
            modelBuilder.Entity<Role>().ToTable("Roles");
            modelBuilder.Entity<Role>(eb =>
            {
                eb.Property(r => r.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
            });
            //OrderItem
            modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
            modelBuilder.Entity<OrderItem>(eb =>
            {
                eb.Property(oi => oi.Price).HasColumnType("money");
            });
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Room)
                .WithMany(r => r.OrderItems)
                .HasForeignKey(oi => oi.Room_Id);
            //GeographycalPlace
            modelBuilder.Entity<GeographycalPlace>().ToTable("GeographycalPlaces");
            modelBuilder.Entity<GeographycalPlace>(eb =>
            {
                eb.Property(g => g.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(g => g.Thumbnail).HasColumnType("varchar(300)");
            });
            modelBuilder.Entity<GeographycalPlace>()
                .HasMany(g => g.Properties)
                .WithOne(p => p.GeographycalPlace)
                .HasForeignKey(p => p.Geographycal_Id);
            //Facilities
            modelBuilder.Entity<Facility>().ToTable("Facilities");
            modelBuilder.Entity<Facility>(eb =>
            {
                eb.Property(f => f.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(f => f.Icon).HasColumnType("varchar(15)");
            });
            modelBuilder.Entity<Facility>()
                .HasMany(f => f.Properties)
                .WithMany(p => p.Facilities)
                .UsingEntity<PropertyFacility>(
                l => l.HasOne<Property>(e => e.Property).WithMany().HasForeignKey(e => e.Property_Id),
            r => r.HasOne<Facility>(e => e.Facility).WithMany().HasForeignKey(e => e.Facility_Id));
            modelBuilder.Entity<Facility>()
                .HasMany(f => f.Rooms)
                .WithMany(r => r.Facilities)
                .UsingEntity<RoomFacility>(
                l => l.HasOne<Room>(e => e.Room).WithMany().HasForeignKey(e => e.Room_Id),
            r => r.HasOne<Facility>(e => e.Facility).WithMany().HasForeignKey(e => e.Facility_Id));
            // Property Facilities
            modelBuilder.Entity<PropertyFacility>().ToTable("PropertyFacilities");
            // Room Facilities
            modelBuilder.Entity<RoomFacility>().ToTable("RoomFacilities");
            //PropertyType
            modelBuilder.Entity<PropertyType>().ToTable("PropertyTypes");
            modelBuilder.Entity<PropertyType>(eb =>
            {
                eb.Property(pt => pt.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(pt => pt.Thumbnail).HasColumnType("varchar(300)");
            });
            modelBuilder.Entity<PropertyType>()
                .HasMany(pt => pt.Properties)
                .WithOne(p => p.PropertyType)
                .HasForeignKey(p => p.Type_Id);
            //Voucher
            modelBuilder.Entity<Voucher>().ToTable("Vouchers");
            modelBuilder.Entity<Voucher>(eb =>
            {
                eb.Property(v => v.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
            });
            modelBuilder.Entity<Voucher>()
                .HasOne(v => v.Property)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(v => v.Scope);
            //Property Neighbor
            modelBuilder.Entity<NeighborhoodProperty>().ToTable("NeighborhoodsProperties");
            //Neighborhood
            modelBuilder.Entity<Neighborhood>().ToTable("Neighborhoods");
            modelBuilder.Entity<Neighborhood>(eb =>
            {
                eb.Property(n => n.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(n => n.Thumbnail).HasColumnType("varchar(300)");
            });
            modelBuilder.Entity<Neighborhood>()
                .HasOne(n => n.GeographycalPlace)
                .WithMany(g => g.Neighborhoods)
                .HasForeignKey(n => n.GeograhycalPlace_Id);
            //Property
            modelBuilder.Entity<Property>().ToTable("Properties");
            modelBuilder.Entity<Property>(eb =>
            {
                eb.Property(p => p.Images).HasConversion(new ValueConverter<List<string>, string>(
            v => JsonConvert.SerializeObject(v), // Convert to string for persistence
            v => JsonConvert.DeserializeObject<List<string>>(v)));
            });
            modelBuilder.Entity<Property>(eb =>
            {
                eb.Property(p => p.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(p => p.Address).HasColumnType("varchar(300)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode(); 
            });
            modelBuilder.Entity<Property>()
                .HasMany(p => p.Neighborhoods)
                .WithMany(n => n.Properties)
                .UsingEntity<NeighborhoodProperty>(
                l => l.HasOne<Neighborhood>().WithMany().HasForeignKey(e => e.Neighborhood_Id).OnDelete(DeleteBehavior.NoAction),
            r => r.HasOne<Property>().WithMany().HasForeignKey(e => e.Property_Id).OnDelete(DeleteBehavior.NoAction));
            modelBuilder.Entity<Property>()
                .HasMany(p => p.Rooms)
                .WithOne(r => r.Property)
                .HasForeignKey(r => r.Property_Id);
            //Room
            modelBuilder.Entity<Room>().ToTable("Rooms");
            modelBuilder.Entity<Room>(eb =>
            {
                eb.Property(r => r.Price).HasColumnType("money");
                eb.Property(r => r.Name).UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
                eb.Property(r=>r.TrackVersion).IsConcurrencyToken();
                eb.Property(r => r.Images).HasConversion(new ValueConverter<List<string>, string>(
            v => JsonConvert.SerializeObject(v), // Convert to string for persistence
            v => JsonConvert.DeserializeObject<List<string>>(v)));
            });
            modelBuilder.Entity<Room>()
                .HasMany(r => r.PriceLists)
                .WithOne(pl => pl.Room)
                .HasForeignKey(pl => pl.Room_Id);
            modelBuilder.Entity<Room>()
                .HasOne(r => r.RoomType)
                .WithMany(rt => rt.Rooms)
                .HasForeignKey(r => r.Type_Id);
            //Room Type
            modelBuilder.Entity<RoomType>().ToTable("RoomTypes");
            modelBuilder.Entity<RoomType>(eb =>
            {
                eb.Property(rt => rt.Name).HasColumnType("varchar(50)").UseCollation("LATIN1_GENERAL_100_CI_AS_SC_UTF8")
        .IsUnicode();
            });
            // Price List
            modelBuilder.Entity<PriceList>().ToTable("PriceLists");
            modelBuilder.Entity<PriceList>(eb =>
            {
                eb.Property(pl => pl.Type).HasColumnType("varchar(15)");
            });
            // Review
            modelBuilder.Entity<Review>().ToTable("Reviews");
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.User_Id)
                .IsRequired();
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Room)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.Room_Id)
                .IsRequired();
        }
    }
}
