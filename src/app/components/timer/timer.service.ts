import {Injectable} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import {Observable} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Injectable()
export class TimerService {
  private clock: Moment;
  private secondsClock: Moment;
  private nearestQuarterClock: Moment;
  private everySecondObservable: Observable<number>;

  constructor() {
    this.refreshAllClocks();
    this.registerClockTicking();
  }

  public roundToNearestQuarter(time: Moment): Moment {
    // console.log('------')
    const whichQuarter = Math.floor(time.minutes() / 15);
    // console.log(whichQuarter);
    const minutesMod15 = time.minutes() % 15;
    // console.log(minutesMod15 );
    const quarterToAdd = Math.round(minutesMod15 / 15);
    // console.log(quarterToAdd);
    const newMinutesValue = (whichQuarter + quarterToAdd) * 15;
    // console.log(newMinutesValue);
    return time.clone().minutes(newMinutesValue);
  }

  private registerClockTicking() {
    this.everySecondObservable = Observable.timer(0, 1000);
    this.everySecondObservable.subscribe(_ => {
      this.refreshAllClocks();
    });
  }

  public getClock(): Moment {
    return this.clock;
  }

  public getNearestQuarterClock() : Moment {
    return this.nearestQuarterClock;
  }

  public getEverySecondObservable() : Observable<number> {
    return this.everySecondObservable;
  }

  private refreshAllClocks(){
    this.clock = moment();
    this.refreshSecondsClock();
    this.refreshNearestQuarterClock();
  }

  private refreshSecondsClock() {
    this.secondsClock = moment(this.clock);
  }

  private refreshNearestQuarterClock() {
    this.nearestQuarterClock = this.roundToNearestQuarter(moment(this.clock))
  }


}
