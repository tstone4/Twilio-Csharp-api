using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using toms_idiot_server.Hubs;
using toms_idiot_server.Models;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace toms_idiot_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        const string accountSID = "ACa46ac2035c48406f88421f79f85e8c3d";
        const string accountAuthToken = "03a752b242724e5d1bb95f7b6bc8d1ca";
        private IHubContext<ChatHub> _hub;
        public ChatController(IHubContext<ChatHub> hub)
        {
            _hub = hub;
        }



        [HttpPost]
        [Route("chat/{message}")]
        public IActionResult Post(string message)
        {
            TwilioClient.Init(accountSID, accountAuthToken);
            //MessageResource.Create(body: $"{ message }", to: "+17347654709", from: "+17343664882");

            _hub.Clients.All.SendAsync("chatroom", message);
            return Ok(new { Message = "Request Completed" });
        }
    }
}