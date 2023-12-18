using Domain.PropertyDomains;
using Domain.RoomDomains;
using Infrastructure.EntityModels.PropertyModel;
using Infrastructure.EntityModels.RoomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IPropertyServices
    {
        public IEnumerable<PropertyDomain> GetProperties(PropertySearch search, PropertyFilter filter, PropertySort sort, PropertyPagination pagination);
        public PropertyDomain GetById(int id,PropertySearch propertySearch);
        public PropertyDomain AddProperty(PropertyDomain property);
        public PropertyDomain UpdateProperty(PropertyDomain property);
        public bool DeleteProperty(int id);
        public IEnumerable<PropertyDomain> GetAllByUserId(int userId);
        public bool SoftDeleteProperty(int id);
    }
    public class PropertyServices : IPropertyServices
    {
        private IPropertyRepository propertyRepository;
        private IRoomRepository roomRepository;
        public PropertyServices(IPropertyRepository propertyRepository, IRoomRepository roomRepository)
        {
            this.propertyRepository = propertyRepository;
            this.roomRepository = roomRepository;
        }
        public PropertyDomain AddProperty(PropertyDomain property)
        {
            return propertyRepository.AddProperty(property);
        }

        public bool DeleteProperty(int id)
        {
            return propertyRepository.DeleteProperty(id);

        }
        public bool SoftDeleteProperty(int id)
        {
            PropertyDomain propertyDomain = propertyRepository.GetById(id);
            propertyDomain.IsDeleted = true;
            PropertyDomain newProperty = propertyRepository.UpdateProperty(propertyDomain);
            if (newProperty != null)
                return true;
            else return false;
        }

        public PropertyDomain GetById(int id,PropertySearch propertySearch)
        {
            
            var property = propertyRepository.GetById(id);
            if(propertySearch != null)
            {
                var availableRooms = roomRepository.GetAvailableRoomsOfProperty(id, propertySearch);
                if (property.Rooms != null && property.Rooms.Count > 0 && availableRooms != null && availableRooms.Count() > 0)
                {
                    foreach (var room in property.Rooms)
                    {
                        if (availableRooms.Any(ar => ar.Id == room.Id))
                        {
                            room.IsAvailable = true;
                        }
                        else room.IsAvailable = false;
                    }
                }
            }    
            return property;

        }

        public IEnumerable<PropertyDomain> GetProperties(PropertySearch search, PropertyFilter filter, PropertySort sort, PropertyPagination pagination)
        {
            var result = propertyRepository.GetProperties(search, filter, sort, pagination);
            var modified = new List<PropertyDomain>();
            foreach (var property in result)
            {
                property.Price = FindCheapestRooms(property.Rooms,search.PeopleNum.Value);
                property.ReviewScore = ReviewScoreForProperty(property.Rooms);
                property.Rooms = null;
                property.Vouchers= null;
                property.Owner= null;
                property.Facilities= null;
                property.Neighborhoods= null;
                property.GeographycalPlace= null;
                modified.Add(property);
            }
            if(sort!=null && sort.SortBy=="priceAsc")
            {
               modified= modified.OrderBy(p => p.Price).ToList();
            }    
            if(sort != null && sort.SortBy == "priceDesc")
            {
                modified =modified.OrderByDescending(p => p.Price).ToList();
            }    
            return modified;

        }
        public IEnumerable<PropertyDomain> GetAllByUserId(int userId)
        {
            
            return propertyRepository.GetAllByUserId(userId);
        }
        public PropertyDomain UpdateProperty(PropertyDomain property)
        {
            return propertyRepository.UpdateProperty(property);
        }
        public static double FindCheapestRooms(List<RoomDomain> rooms, int requiredPeople)
        {
            int n = rooms.Count;
            List<RoomDomain> bestCombination = null;
            double bestPrice = double.MaxValue;

            // Define a recursive function to find combinations
            void FindCombinations(int index, int currentCapacity, List<RoomDomain> currentCombination)
            {
                if (index == n)
                {
                    if (currentCapacity >= requiredPeople)
                    {
                        double currentPrice = currentCombination.Sum(room => room.Price.Value);
                        if (currentPrice < bestPrice)
                        {
                            bestPrice = currentPrice;
                            bestCombination = new List<RoomDomain>(currentCombination);
                        }
                    }
                    return;
                }

                // Include the current room
                currentCombination.Add(rooms[index]);
                FindCombinations(index + 1, currentCapacity + (rooms[index].Single_Bed.Value+ rooms[index].Double_Bed.Value*2), currentCombination);
                currentCombination.RemoveAt(currentCombination.Count - 1); // Backtrack

                // Exclude the current room
                FindCombinations(index + 1, currentCapacity, currentCombination);
            }

            FindCombinations(0, 0, new List<RoomDomain>());
            double price = 0;
            foreach(var room in bestCombination)
            {
                price += room.Price.Value;
            }    
            return price;
        }
        public static double ReviewScoreForProperty(List<RoomDomain> rooms)
        {
            double totalScore = 0;
            double totalReview = 0;
            foreach (var room in rooms)
            {
                foreach(var review in room.Reviews)
                {
                    totalScore+= review.Score.Value;
                }
                totalReview += room.Reviews.Count;
            }
            double result = 5;
            if(totalReview > 0)
            {
                result =Math.Round(totalScore / totalReview, 1);
            }
            return result;

        }
        public static double PriceForProperty(List<RoomDomain> rooms, int peopleNum)
        {
            int n = rooms.Count;
            double[,] dp = new double[n + 1, peopleNum + 1];
            List<RoomDomain> largeRooms = rooms.Where(r => (r.Single_Bed.Value + r.Double_Bed.Value * 2)>= peopleNum).ToList();
            largeRooms.OrderBy(r => r.Price);
            // Initialize dp array
            for (int i = 0; i <= n; i++)
            {
                for (int j = 0; j <= peopleNum; j++)
                {
                    dp[i, j] = double.MaxValue;
                }
            }
            dp[0, 0] = 0;

            for (int i = 1; i <= n; i++)
            {
                for (int j = 0; j <= peopleNum; j++)
                {
                    // Don't include the current room
                    dp[i, j] = dp[i - 1, j];

                    // Try to include the current room
                    var room = rooms[i - 1];
                    if ((room.Single_Bed.Value + room.Double_Bed.Value * 2) <= j && dp[i - 1, j - (room.Single_Bed.Value + room.Double_Bed.Value * 2)] != double.MaxValue)
                    {
                        dp[i, j] = Math.Min(dp[i, j], dp[i - 1, j - (room.Single_Bed.Value + room.Double_Bed.Value * 2)] + (int)room.Price);
                    }
                }
            }

            // Reconstruct the cheapest combination
            int remainingSpace = peopleNum;
            var cheapestRooms = new List<RoomDomain>();
            for (int i = n; i > 0; i--)
            {
                var room = rooms[i - 1];
                if ((room.Single_Bed.Value + room.Double_Bed.Value * 2) <= remainingSpace && Math.Round(dp[i, remainingSpace], 2) == Math.Round(dp[i - 1, remainingSpace - (room.Single_Bed.Value + room.Double_Bed.Value * 2)] + (int)room.Price, 2))
                {
                    cheapestRooms.Add(room);
                    remainingSpace -= (room.Single_Bed.Value + room.Double_Bed.Value * 2);
                }
            }
            double price = 0;
            double largeRoomPrice = 0;
            if(largeRooms.Count > 0)
            {
                largeRoomPrice = largeRooms[0].Price.Value;
            }
            foreach(var room in cheapestRooms)
            {
                price += room.Price.Value;
            }
            double result = 0;
            result = largeRoomPrice<price?largeRoomPrice >0 ? largeRoomPrice: price:price >0 ? price :largeRoomPrice;
            return result;
        }    
    }
}
