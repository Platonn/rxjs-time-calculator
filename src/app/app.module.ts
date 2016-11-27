import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TimeTableComponent} from './components/time-table/time-table.component';
import {CurrentTimeComponent} from './components/current-time/current-time.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    TimeTableComponent,
    CurrentTimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
