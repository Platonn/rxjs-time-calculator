import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import Moment = moment.Moment;

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent implements OnInit {
  private timer: Moment;
  private secondsClock: string;
  private minutesClock: string;


  constructor() {
  }

  ngOnInit() {
    this.registerClockTicking();
  }

  registerClockTicking() {
    let timerSecond = Observable.timer(0, 1000);
    timerSecond.subscribe(_ => {

      this.timer = moment(); // get now
      this.refreshSecondsClock();
      this.refreshMinutesClock();
    });
  }

  refreshSecondsClock() {
    this.secondsClock = moment(this.timer).format('HH:mm:ss');
  }

  refreshMinutesClock() {
    this.minutesClock = moment(this.timer).format('HH:mm');
  }

}
