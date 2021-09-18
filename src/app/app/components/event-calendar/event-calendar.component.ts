import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class EventCalendarComponent implements OnInit {
  ngOnInit(): void {}
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  locale: string = 'pl';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }
}
