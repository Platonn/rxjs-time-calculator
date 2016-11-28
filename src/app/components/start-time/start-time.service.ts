import {Injectable} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import {TimerService} from '../timer/timer.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable()
export class StartTimeService {
  private customTime: Moment;
  private timerService: TimerService;
  private useCustom: boolean;
  private timerSubscription: Subscription;
  private startTime$$: BehaviorSubject<Moment>;

  constructor(timerService: TimerService) {
    this.timerService = timerService;
    this.startTime$$ = new BehaviorSubject(timerService.getCurrentTime());
    this.setIsCustom(false);
  }

  public getStartTime$(): Observable<Moment> {
    return this.startTime$$.asObservable();
  }

  public getStartTimeValue(): Moment {
    return this.startTime$$.getValue();
  }

  public setIsCustom(useCustom: boolean): void {
    if (useCustom != this.useCustom) {
      if (useCustom) {
        this.unsubscribeTimer();
      } else {
        this.subscribeTimer();
      }
    }
    this.useCustom = useCustom;
  }

  public getIsCustom(): boolean {
    return this.useCustom;
  }

  public setCustomTime(customTime: Moment): void {
    this.customTime = customTime;
    if(this.useCustom) {
      this.startTime$$.next(this.customTime);
    }
  }

  private subscribeTimer(): void {
    this.timerSubscription =
      this.timerService.getTimer$()
        .subscribe(time => this.startTime$$.next(time));
  }

  private unsubscribeTimer(): void {
    this.timerSubscription.unsubscribe();
    this.startTime$$.next(this.customTime);
  }
}
