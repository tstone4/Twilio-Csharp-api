import { Component, OnInit } from '@angular/core';
import { SignalRServiceService } from './signal-rservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SignalRTest';
  message: string;
  constructor(private signalRService: SignalRServiceService, private http: HttpClient) {
  }

  ngOnInit() {
    // this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();
    // this.startHttpRequest();
  }

  buttonClick() {
    this.signalRService.sendMessage(this.message);
  }
}
