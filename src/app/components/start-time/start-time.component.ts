import {Component, OnInit} from '@angular/core';
import {StartTimeService} from './start-time.service';
import * as moment from 'moment';
import Moment = moment.Moment;

@Component({
  selector: 'app-start-time',
  templateUrl: './start-time.component.html',
  styleUrls: ['./start-time.component.css']
})
export class StartTimeComponent implements OnInit {
  private useCustom: boolean;
  private startTimeService: StartTimeService;
  private spikeStartTime: Moment;
  private customTimeHours: number;
  private customTimeMinutes: number;

  constructor(startTimeService: StartTimeService) {
    this.startTimeService = startTimeService;
    this.initCustomInputs();
  }

  private initCustomInputs(): void {
    this.customTimeHours = 12;
    this.customTimeMinutes = 0
  }


  ngOnInit() {
    this.useCustom = this.startTimeService.getIsCustom();
    this.spikeStartTime = this.startTimeService.getStartTimeValue();
    this.startTimeService.getStartTime$()
      .subscribe(time => this.spikeStartTime = time);
    this.calcCustomTime();
  }

  private calcCustomTime(): void {
    let customTime = moment().hours(this.customTimeHours || 0).minutes(this.customTimeMinutes || 0).seconds(0);
    this.startTimeService.setCustomTime(customTime);
  }

  private setUseCustom(value: boolean) {
    this.startTimeService.setIsCustom(value);
  }

}
