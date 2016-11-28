import {Injectable} from '@angular/core';
import {Task} from './task';
import * as moment from 'moment';
import Moment = moment.Moment;

@Injectable()
export class TasksManagerService {

  constructor() {
  }

  public addQuarterToPlannedEndTime(tasks: Task[]): Task[] {
    for (let task of tasks) {
      task.plannedEndTime = task.plannedEndTime.add(15, 'minutes');
    }
    return tasks;
  }

  public subtractQuarterFromPlannedEndTime(tasks: Task[]): Task[] {
    for (let task of tasks) {
      task.plannedEndTime = task.plannedEndTime.subtract(15, 'minutes');
    }
    return tasks;
  }

  public calcEndTimes(startTime : Moment, tasks: Task[]): Task[] {
    let task = tasks[0];
    let duration = moment.duration({minutes: task.durationMinutes, hours: task.durationHours});
    tasks[0].endTime = startTime.clone().add(duration);

    let length = tasks.length;
    for (let i = 1; i < length; i++) {
      let previousTask = tasks[i - 1];
      let task = tasks[i];
      let duration = moment.duration({minutes: task.durationMinutes, hours: task.durationHours});
      tasks[i].endTime = previousTask.endTime.clone().add(duration);
    }
    return tasks
  }

  public calcTimeLeft(startTime : Moment, tasks : Task[]) : Task[] {
    for (let task of tasks) {
      let diff = moment(task.plannedEndTime.diff(startTime)).utc(); // utc is important, because its absolute difference
      task.timeLeft = diff;
    }
    return tasks;
  }
}
