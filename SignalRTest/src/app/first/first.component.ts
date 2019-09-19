import { Component, OnInit } from '@angular/core';
import { SignalRServiceService } from '../signal-rservice.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  message: string = 'hi';
  constructor(private signalRService: SignalRServiceService) { }

  ngOnInit() {
  }

  buttonClicked() {
    this.signalRService.sendMessage(this.message).subscribe(() => {});
  }

}
