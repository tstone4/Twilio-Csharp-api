using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace toms_idiot_server.Models
{
    public class MessagePayload
    {
        public string message { get; set; }
        public int userId { get; set; }
    }
}
