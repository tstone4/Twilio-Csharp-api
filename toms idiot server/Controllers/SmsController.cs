using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Twilio;
using Twilio.Exceptions;
using Twilio.Rest.Api.V2010.Account;

namespace toms_idiot_server.Controllers
{
    public class SmsController : Controller
    {
        const string accountSID = "ACa46ac2035c48406f88421f79f85e8c3d";
        const string accountAuthToken = "03a752b242724e5d1bb95f7b6bc8d1ca";

        [HttpGet]
        [Route("sms")]
        public void Index()
        {
            var psi = new ProcessStartInfo() { FileName = @"C:\Users\tstone\AppData\Roaming\Spotify\Spotify.exe", UseShellExecute = true };
            Process.Start(psi);
        }

        [HttpPost]
        [Route("sms/1")]
        public void reply(string text)
        {
            TwilioClient.Init(accountSID, accountAuthToken);

            var message = MessageResource.Create(
                body: $"The message: {text} failed to send correctly. ",
                to: "+17347654709",
                from: "+17343664882");
        }
    }
}