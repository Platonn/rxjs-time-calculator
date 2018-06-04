export class Period {
  startHours: number;
  endHours: number;
  startMinutes: number;
  endMinutes: number;

  constructor(startHours: number, startMinutes: number, endHours: number, endMinutes: number){
    this.startHours = startHours;
    this.startMinutes = startMinutes;
    this.endHours = endHours;
    this.endMinutes = endMinutes;
  }
}
