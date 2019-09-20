using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using toms_idiot_server.DataStorage;
using toms_idiot_server.Hubs;
using toms_idiot_server.TimerFeatures;

namespace toms_idiot_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private IHubContext<ChartHub> _hub;
        private List<TimerManager> timerManagers;

        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        //https://localhost:44306/api/chart/chart
        [HttpGet]
        [Route("chart")]
        public IActionResult Get()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));
            return Ok(new { Message = "Request Completed" });
        }

        [HttpDelete]
        [Route("chart/{id}")]
        public void Delete([System.Web.Http.FromUri] Guid id)
        {
            var itemToRemove = timerManagers.SingleOrDefault(r => r.Id == id);
            if (itemToRemove != null)
                timerManagers.Remove(itemToRemove);

            itemToRemove._timer.Dispose();
        }
    }
}