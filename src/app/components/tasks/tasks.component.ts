import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import Duration = moment.Duration;
import {Task} from './task';
import {TasksService} from './tasks.service';
import {TasksManagerService} from './tasks-manager.service';
import {StartTimeService} from '../start-time/start-time.service';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})

export class TasksComponent implements OnInit {
  private taskService: TasksService;
  private startTimeService: StartTimeService;
  private tasksManagerService: TasksManagerService;
  private tasks: Task[];
  private tasksDurationSum: Moment;
  private startTime: Moment;

  constructor(taskService: TasksService,
              startTimeService: StartTimeService,
              tasksManagerService: TasksManagerService) {
    this.taskService = taskService;
    this.startTimeService = startTimeService;
    this.tasksManagerService = tasksManagerService;
  }

  ngOnInit() {
    this.getTasks();
    this.getTimer();

    this.calcEndTimes();
    this.calcTasksDurationSum();
    this.copyToPlannedEndTime();
  }

  getTimer() {
    this.startTime = this.startTimeService.getStartTimeValue();
    this.startTimeService.getStartTime$()
      .subscribe(startTime => {
        this.startTime = startTime;
        this.calcEndTimes();
        this.calcTimeLeft();
      });
  }

  copyToPlannedEndTime() {
    this.tasks = this.tasksManagerService.copyToPlannedEndTime(this.tasks);
    this.calcTimeLeft();
  }

  onTaskDurationsChanged() {
    this.calcEndTimes();
    this.calcTasksDurationSum();
  }

  calcTasksDurationSum() {
    this.tasksDurationSum = this.tasksManagerService.calcTasksDurationSum(this.tasks);
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
    this.tasks = this.tasksManagerService.calcEndTimes(this.startTime, this.tasks);
  }

  calcTimeLeft() {
    this.tasksManagerService.calcTimeLeft(this.startTime, this.tasks);
  }

  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

}
