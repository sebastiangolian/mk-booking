import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { addDays, addMonths, addWeeks, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from 'date-fns';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}

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
  @Input() calendarEvents: CalendarEvent[] = [];
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() eventDates!: Date[];
  view: CalendarView | CalendarPeriod = CalendarView.Month;
  CALENDAR_VIEW = CalendarView;
  viewDate = new Date();
  locale: string = 'pl';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  ngOnInit(): void {
    this.dateOrViewChanged();
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    alert(events[0].title);
  }

  dateIsValid(date: Date): boolean {
    if (this.eventDates) {
      const findDate = this.eventDates.find((d) => d.toLocaleDateString() === date.toLocaleDateString());
      if (findDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    const firstDayCurrentView = endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1));
    const lastDayCurrentView = endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 0));

    console.log(lastDayCurrentView.toLocaleDateString(), this.maxDate.toLocaleDateString());

    this.prevBtnDisabled = firstDayCurrentView <= this.minDate;
    this.nextBtnDisabled = lastDayCurrentView >= this.maxDate;

    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }
}
