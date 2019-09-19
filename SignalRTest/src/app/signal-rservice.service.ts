import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { ChartModel } from './chart-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  public data: ChartModel[];
  private hubConnection: signalR.HubConnection;

  constructor(private httpClient: HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44306/chart').build();
    // tslint:disable-next-line: max-line-length
    this.hubConnection.start().then(() => console.log('Connection started')).catch(err => console.log('Error while starting connections: ' + err));
  }

  public addTransferChartDataListener = () => {
    console.log('TransferData called');
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  sendMessage(message: string): Observable<any> {
    return this.httpClient.get('https://localhost:44306/chat/get');
  }
}
