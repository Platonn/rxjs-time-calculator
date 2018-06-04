import {Injectable} from '@angular/core';
import {Task} from '../models'
import {tasks} from '../mocked-data'

@Injectable()
export class TasksService {

  constructor() {
  }

  public getTasks(): Task[] {
    return tasks;
  }

}
