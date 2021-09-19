import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { EventCalendarComponent } from './app/components/event-calendar/event-calendar.component';
import { EventItemComponent } from './app/components/event-item/event-item.component';
import { TestComponent } from './app/components/test/test.component';
import { AppComponent } from './app/pages/app/app.component';
import { EventComponent } from './app/pages/event/event.component';
import { EventsComponent } from './app/pages/events/events.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [AppComponent, TestComponent, EventItemComponent, EventsComponent, EventComponent, EventCalendarComponent],
  imports: [
    //imorts
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
