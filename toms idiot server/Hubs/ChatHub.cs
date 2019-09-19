﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace toms_idiot_server.Hubs
{
    public class ChatHub : Hub
    {
        [HttpPost]
        [Route("chat")]
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        [HttpGet]
        [Route("chat/get")]
        public void Get()
        {
            var x = 10;
        }
    }
} 
