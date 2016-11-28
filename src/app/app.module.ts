import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {TimerComponent} from './components/timer/timer.component';
import {MomentModule} from 'angular2-moment';
import {TasksService} from './components/tasks/tasks.service';
import {TimerService} from './components/timer/timer.service';
import {TasksManagerService} from './components/tasks/tasks-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [TasksService, TimerService, TasksManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
