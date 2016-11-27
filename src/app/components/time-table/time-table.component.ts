import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import Moment = moment.Moment;
import Duration = moment.Duration;
import {Task} from './Task';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  private tasks: Task[];

  constructor() {
  }

  ngOnInit() {
    this.tasks = this.getTasks();
    this.recalculateEndTimes();
  }

  recalculateEndTimes() {
    let startTime = moment();
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
    console.log('recalculation done')
    return this.tasks
  }


  getTasks(): Task[] {
    return [
      {
        id: '1',
        name: 'task 1',
        durationMinutes: 15,
        durationHours: 0,
        endTime: moment()
      },
      {
        id: '2',
        name: 'task 2',
        durationMinutes: 30,
        durationHours: 0,
        endTime: moment()
      },
      {
        id: '3',
        name: 'task 3',
        durationMinutes: 30,
        durationHours: 0,
        endTime: moment()
      },
      {
        id: '4',
        name: 'task 4',
        durationMinutes: 30,
        durationHours: 0,
        endTime: moment()
      },
      {
        id: '5',
        name: 'task 5',
        durationMinutes: 30,
        durationHours: 0,
        endTime: moment()
      }

    ];
  }

}
