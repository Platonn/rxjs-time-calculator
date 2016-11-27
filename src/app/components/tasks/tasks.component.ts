import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import Duration = moment.Duration;
import {Task} from './task';
import {TasksService} from './tasks.service';
import {TimerService} from '../timer/timer.service';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksComponent implements OnInit {
  private taskService: TasksService;
  private timerService: TimerService;
  private tasks: Task[];

  constructor(taskService: TasksService, timerService: TimerService) {
    this.taskService = taskService;
    this.timerService = timerService;
  }

  ngOnInit() {
    this.getTasks();

    this.calculateEndTimes();
    this.copyToPlannedEndTime();

    this.timerService.getEverySecondObservable().subscribe(_ => {
      this.calculateTimeLeft();
    })
  }

  copyToPlannedEndTime() {
    for (let task of this.tasks) {
      task.plannedEndTime = task.endTime.clone();
    }
    this.calculateTimeLeft();
  }


  addQuarterToPlannedEndTime() {
    for (let task of this.tasks) {
      task.plannedEndTime = task.plannedEndTime.add(15, 'minutes');
    }
    this.calculateTimeLeft();
  }

  subtractQuarterFromPlannedEndTime() {
    for (let task of this.tasks) {
      task.plannedEndTime = task.plannedEndTime.subtract(15, 'minutes');
    }
    this.calculateTimeLeft();
  }


  calculateEndTimes() {
    let startTime = this.timerService.getNearestQuarterClock();

    let task = this.tasks[0];
    let duration = moment.duration({minutes: task.durationMinutes, hours: task.durationHours});
    this.tasks[0].endTime = startTime.clone().add(duration);

    let length = this.tasks.length;
    for (let i = 1; i < length; i++) {
      let previousTask = this.tasks[i - 1];
      let task = this.tasks[i];
      let duration = moment.duration({minutes: task.durationMinutes, hours: task.durationHours});
      this.tasks[i].endTime = previousTask.endTime.clone().add(duration);
    }
    console.log('recalculation done');
    return this.tasks
  }

  calculateTimeLeft() {
    let clock = this.timerService.getClock();
    for (let task of this.tasks) {
      let diff = moment(task.plannedEndTime.diff(clock)).utc(); // utc is important, because its absolute difference
      task.timeLeft = diff;
    }
  }


  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

}
