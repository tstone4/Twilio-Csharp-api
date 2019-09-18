using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace toms_idiot_server.Controllers
{
    public class SmsController : Controller
    {
        [HttpGet]
        [Route("sms")]
        public void Index()
        {
            var psi = new ProcessStartInfo() { FileName = @"C:\Users\tstone\AppData\Roaming\Spotify\Spotify.exe", UseShellExecute = true };
            Process.Start(psi);
        }
    }
}