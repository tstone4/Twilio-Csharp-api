import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { ChartModel } from './chart-model';
import { MessagePayload } from './message-payload';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {

  public data: ChartModel[];
  public messageList: string[] = [''];
  public message: string;
  private hubConnection: signalR.HubConnection;
  userId: number;

  constructor(private httpClient: HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44306/chart').build();
    this.hubConnection.start().then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connections: ' + err));
  }
  public stopConnection = () => {
    this.hubConnection.off('transferchartdata');
    this.hubConnection.stop();
  }

  public addTransferChartDataListener = () => {
    console.log('TransferData called');
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(this.data);
      
    });
  }

  startChatConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44306/chat').build();
    this.hubConnection.start().then(() => console.log('Chat Connection started'))
    .catch(err => console.log('Error while starting connections: ' + err));
  }
  addChatListener() {
    this.hubConnection.on('chatroom', (data) => {
      console.log('data: ' + data);
      this.message = data;
      this.messageList .push(data);
    });
  }
  sendMessage(message: string): Observable<any> {
    return this.httpClient.get('https://localhost:44306/chat/get');
  }
}
