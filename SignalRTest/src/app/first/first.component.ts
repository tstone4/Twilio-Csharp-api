import { Component, OnInit } from '@angular/core';
import { SignalRServiceService } from '../signal-rservice.service';
import { HttpClient } from '@angular/common/http';
import { MessagePayload } from '../message-payload';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  message: string = 'hi';

  userId: number;

  disabledSendChat: boolean = true;
  disabledJoinChat: boolean = false;
  messageReceived: string = '';
  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };





  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]
  constructor(private signalRService: SignalRServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startChatConnection();
  }

  buttonClicked() {
    this.signalRService.sendMessage(this.message).subscribe(() => { });
  }
  signalRButtonStart() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
  }

  signalRButtonStop() {
    this.signalRService.stopConnection();
  }

  chatRoomJoin() {
    this.userId = Math.floor(Math.random() * 100);
    this.disabledSendChat = false;
    this.signalRService.addChatListener();
    this.disabledJoinChat = true;
  }
  chatRoomTest() {
    this.startChatHttpRequest();
  }
  startChatHttpRequest() {
    let messagePayload: MessagePayload = {
    userId: this.userId,
    message: this.message
    };
    this.http.post('https://localhost:44306/api/chat/chat/' + this.message, this.message).subscribe(res => {
      this.messageReceived = res.toString();
    });
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:44306/api/chart/chart').subscribe(res => {
      console.log(res);
    });
  }
}


