import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import Moment = moment.Moment;
import {TimerService} from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: 'timer.component.html',
  styleUrls: ['timer.component.css']
})
export class TimerComponent implements OnInit {
  private timerService: TimerService;

  private time: Moment;
  private secondsClock: string;
  private minutesClock: string;
  private nearestQuarterClock: string;


  constructor(timerService: TimerService) {
    this.timerService = timerService;
  }

  ngOnInit() {
    this.registerClockTicking();
  }

  registerClockTicking() {
    this.timerService.getTimer$().subscribe(time => {
      this.time = time;
      this.refreshSecondsClock();
      this.refreshMinutesClock();
      this.refreshNearestQuarterClock();
    });
  }

  refreshSecondsClock() {
    this.secondsClock = this.time.format('HH:mm:ss');
  }

  refreshMinutesClock() {
    this.minutesClock = this.time.format('HH:mm');
  }

  refreshNearestQuarterClock() {
    const nearestQuarter = this.timerService.roundToNearestQuarter(this.time);
    this.nearestQuarterClock = nearestQuarter.format('HH:mm');
  }

}
