using Domain.GeographycalPlaceDomains;
using Infrastructure.EntityModels.GeographycalPlaceModel;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace BookingServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeographycalPlaceController: ControllerBase
    {
        private IGeographycalPlaceServices geographycalPlaceServices;
        public GeographycalPlaceController(IGeographycalPlaceServices geographycalPlaceServices)
        {
            this.geographycalPlaceServices = geographycalPlaceServices;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult GetAll()
        {
            var result = geographycalPlaceServices.GetAll();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            var result = geographycalPlaceServices.Get(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult Add(GeographycalPlaceDomain geographycalPlace)
        {
            var result = geographycalPlaceServices.Add(geographycalPlace);
            return Ok(result);
        }
        [HttpPut]
        public IActionResult Update(GeographycalPlaceDomain geographycalPlace)
        {
            var result = geographycalPlaceServices.Update(geographycalPlace);
            if (result != null) return Ok(result);
            return BadRequest("This geographycal place does not exist");
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                geographycalPlaceServices.Delete(id); return Ok("Deleted");
            }
            catch { return BadRequest("oops"); }
        }
    }
}
