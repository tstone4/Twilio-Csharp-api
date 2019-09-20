using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace toms_idiot_server.TimerFeatures
{
    public class TimerManager
    {
        public Timer _timer;
        private AutoResetEvent _autoResetEvent;
        private Action _action;
        public Guid Id;

        public DateTime TimerStarted { get; }

        public TimerManager(Action action)
        {
            Id = Guid.NewGuid();
            _action = action;
            _autoResetEvent = new AutoResetEvent(false);
            _timer = new Timer(Execute, _autoResetEvent, 1000, 2000);
            TimerStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            _action();
            if((DateTime.Now - TimerStarted).Seconds > 60)
            {
                _timer.Dispose();
            }
        }
    }
}
