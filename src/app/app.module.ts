import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { EventCalendarComponent } from './app/components/event-calendar/event-calendar.component';
import { EventItemComponent } from './app/components/event-item/event-item.component';
import { MessagesAlertComponent } from './app/components/messages-alert/messages-alert.component';
import { SurveyItemComponent } from './app/components/survey-item/survey-item.component';
import { SurveyItemsComponent } from './app/components/survey-items/survey-items.component';
import { HttpErrorInterceptor } from './app/interceptors/http-error.interceptor';
import { AppComponent } from './app/pages/app/app.component';
import { EventComponent } from './app/pages/event/event.component';
import { EventsComponent } from './app/pages/events/events.component';
import { ReservationConfirmComponent } from './app/pages/reservation-confirm/reservation-confirm.component';
import { ReservationCreateComponent } from './app/pages/reservation-create/reservation-create.component';
import { ReservationPaymentComponent } from './app/pages/reservation-payment/reservation-payment.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    //decorations
    AppComponent,
    EventItemComponent,
    EventsComponent,
    EventComponent,
    EventCalendarComponent,
    ReservationCreateComponent,
    SurveyItemComponent,
    SurveyItemsComponent,
    ReservationConfirmComponent,
    ReservationPaymentComponent,
    MessagesAlertComponent,
  ],
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
    NgbAlertModule,
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
