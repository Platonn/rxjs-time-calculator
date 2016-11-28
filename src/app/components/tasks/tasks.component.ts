import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import Duration = moment.Duration;
import {Task} from './task';
import {TasksService} from './tasks.service';
import {TimerService} from '../timer/timer.service';
import {TasksManagerService} from './tasks-manager.service';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})

export class TasksComponent implements OnInit {
  private taskService: TasksService;
  private timerService: TimerService;
  private tasksManagerService: TasksManagerService;
  private tasks: Task[];
  private tasksDurationSum: Moment;
  private time: Moment;

  constructor(taskService: TasksService,
              timerService: TimerService,
              tasksManagerService: TasksManagerService) {
    this.taskService = taskService;
    this.timerService = timerService;
    this.tasksManagerService = tasksManagerService;
  }

  ngOnInit() {
    this.getTasks();
    this.getTimer();
    this.calcAll();

  }

  calcAll() {
    this.calcEndTimes();
    this.calcTasksDurationSum();
  }

  getTimer() {
    this.time = this.timerService.getCurrentTime();
    this.timerService.getTimer().subscribe(timer => {
      this.time = timer;
      this.calcTimeLeft();
    });
  }

  copyToPlannedEndTime() {
    for (let task of this.tasks) {
      task.plannedEndTime = task.endTime.clone();
    }
    this.calcTimeLeft();
  }

  onTaskDurationsChanged() {
    this.calcEndTimes();
    this.calcTasksDurationSum();
  }

  calcTasksDurationSum() {
    this.tasksDurationSum = this.tasks
      .map(task => moment.duration({hours: task.durationHours, minutes: task.durationMinutes}))
      .reduce((sum, duration) => sum.add(duration), this.timerService.getTimeZero());
  }

  addQuarterToPlannedEndTime() {
    this.tasks = this.tasksManagerService.addQuarterToPlannedEndTime(this.tasks);
    this.calcTimeLeft();
  }

  subtractQuarterFromPlannedEndTime() {
    this.tasks = this.tasksManagerService.subtractQuarterFromPlannedEndTime(this.tasks);
    this.calcTimeLeft();
  }

  calcEndTimes() {
    this.tasks = this.tasksManagerService.calcEndTimes(this.time, this.tasks);
  }

  calcTimeLeft() {
    this.tasksManagerService.calcTimeLeft(this.time, this.tasks);
  }

  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

}
