import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewDay, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { WeekDay } from 'calendar-utils';
import { ApiEventByDate } from '../../interfaces/api-event-by-date.interface';
import { CustomDateFormatter } from '../../providers/custom-date-formatter.provider';
import { addPeriod, CalendarPeriod, endOfPeriod, subPeriod } from '../../utilities/event-calendar.utilities';
import { ApiDate } from './../../interfaces/api-date.interface';

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
  @Input() eventsByDate: ApiEventByDate[] = [];
  @Output() dateSelect: EventEmitter<string> = new EventEmitter();

  locale: string = 'pl';
  view: CalendarView | CalendarPeriod = CalendarView.Month;
  viewDate = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  currentDates: ApiDate[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.dateOrViewChanged();
  }

  onNextMonth(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  onPrevMonth(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  onCurrentMonth(): void {
    this.changeDate(new Date());
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

  dateOrViewChanged(): void {
    const firstDayCurrentView = endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1));
    const lastDayCurrentView = endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 0));
    this.prevBtnDisabled = firstDayCurrentView <= this.minDate;
    this.nextBtnDisabled = lastDayCurrentView >= this.maxDate;
  }

  open(content: TemplateRef<any>, day: WeekDay) {
    const currentDates = this.eventsByDate.find((event) => event.date.toLocaleDateString() === day.date.toLocaleDateString())?.dates;
    if (currentDates) {
      this.currentDates = currentDates;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.dateSelect.emit(result);
      },
      (reason) => {},
    );
  }
}
