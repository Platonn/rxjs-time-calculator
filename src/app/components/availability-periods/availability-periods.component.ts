import {Component, OnInit} from '@angular/core';
import {Period} from '../../models';
import * as moment from 'moment';
import Moment = moment.Moment;

@Component({
  selector: 'app-availability-periods',
  templateUrl: './availability-periods.component.html',
  styleUrls: ['./availability-periods.component.css']
})
export class AvailabilityPeriodsComponent implements OnInit {
  private periods: Period[];
  private sum : Moment;

  constructor() {
  }

  ngOnInit() {
    this.initPeriods();
    this.calcSum();
  }

  //spike:
  initPeriods() {
    this.periods = [
      new Period(7, 0, 10, 30),
      new Period(11, 0, 12, 0),
      new Period(0, 0, 0, 0),
      new Period(0, 0, 0, 0)
    ]
  }

  calcSum() {
    this.sum = this.periods
      .map(period => {
        let start = moment.duration({hours: period.startHours, minutes: period.startMinutes});
        let end = moment.duration({hours: period.endHours, minutes: period.endMinutes});
        let diff = end.subtract(start);
        return diff.asMilliseconds() > 0 ? diff : 0;
      })
      .reduce((sum, duration) => sum.add(duration), moment(0).utc());
  }

}
