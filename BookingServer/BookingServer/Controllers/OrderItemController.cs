using Domain.OrderItemDomains;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController:ControllerBase
    {
        private IOrderItemServices orderItemServices;
        public OrderItemController(IOrderItemServices orderItemServices)
        {
            this.orderItemServices = orderItemServices;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = orderItemServices.GetAll();
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(OrderItemDomain orderItem) 
        {
            var result = orderItemServices.Add(orderItem);
            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Duplicate OrderItem");
            }
        }
        [HttpPut]
        public IActionResult Update(OrderItemDomain orderItem)
        {
            var result = orderItemServices.Update(orderItem);
            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("OrderItem does not exists");
            }
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var result = orderItemServices.Delete(id);
            if(result == true)
            {
                return Ok(result);
            }
            return BadRequest("Delete failed");
        }
    }
}
