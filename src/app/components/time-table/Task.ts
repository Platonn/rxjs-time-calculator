import * as moment from 'moment';
import Moment = moment.Moment;
import Duration = moment.Duration;

export class Task {
  id: string;
  name: string;
  durationHours: number;
  durationMinutes: number;
  endTime: Moment;
}
