import {Injectable} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class TimerService {
  private secondsClock: Moment;
  private nearestQuarterClock: Moment;
  private timer: BehaviorSubject<Moment>;


  constructor() {
    this.timer = new BehaviorSubject(moment());
    this.registerClockTicking();
  }

  public getTimer$(): Observable<Moment> {
    return this.timer.asObservable();
  }

  public getCurrentTime(): Moment {
    return this.timer.getValue();
  }

  public getTimeZero(): Moment {
    return moment(0).utc();
  }

  public roundToNearestQuarter(time: Moment): Moment {
    const whichQuarter = Math.floor(time.minutes() / 15);
    const minutesMod15 = time.minutes() % 15;
    const quarterToAdd = Math.round(minutesMod15 / 15);
    const newMinutesValue = (whichQuarter + quarterToAdd) * 15;
    return time.clone().minutes(newMinutesValue);
  }

  private registerClockTicking() {
    Observable.timer(0, 1000)
      .subscribe(_ => {
        this.timer.next(moment());
      });
  }
}
