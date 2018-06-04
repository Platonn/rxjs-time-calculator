import {Injectable} from '@angular/core';
import {Task} from '../models'
import * as moment from 'moment';


@Injectable()
export class TasksService {

  constructor() {
  }

  public getTasks(): Task[] {
    let momentZero = moment(0).utc();
    return [
      {
        id: '1',
        name: 'task 1',
        durationMinutes: 15,
        durationHours: 0,
        endTime: momentZero,
        plannedEndTime: momentZero,
        timeLeft: momentZero
      },
      {
        id: '2',
        name: 'task 2',
        durationMinutes: 30,
        durationHours: 0,
        endTime: momentZero,
        plannedEndTime: momentZero,
        timeLeft: momentZero
      },
      {
        id: '3',
        name: 'task 3',
        durationMinutes: 30,
        durationHours: 0,
        endTime: momentZero,
        plannedEndTime: momentZero,
        timeLeft: momentZero
      },
      {
        id: '4',
        name: 'task 4',
        durationMinutes: 30,
        durationHours: 0,
        endTime: momentZero,
        plannedEndTime: momentZero,
        timeLeft: momentZero
      },
      {
        id: '5',
        name: 'task 5',
        durationMinutes: 30,
        durationHours: 0,
        endTime: momentZero,
        plannedEndTime: momentZero,
        timeLeft: momentZero
      }

    ];
  }

}
