import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { first } from 'rxjs/operators';
import { ApiEventByDate } from '../../interfaces/api-event-by-date.interface';
import { ApiEventByDateMapper } from '../../mappers/api-event-by-date.mapper';
import { ApiEvent } from './../../interfaces/api-event.interface';
import { ApiEventMapper } from './../../mappers/api-event.mapper';
import { EventService } from './../../services/event.service';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  idEvent: string = '';
  event!: ApiEvent;
  calendarEvents: CalendarEvent[] = [];
  eventsByDate: ApiEventByDate[] = [];
  minDate!: Date;
  maxDate!: Date;
  eventDates!: Date[];
  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const idEvent = this.route.snapshot.paramMap.get('idEvent');
    if (idEvent) {
      this.idEvent = idEvent;
      this.fetchEvent();
    }
  }

  onDateSelect(idDate: string): void {
    this.router.navigate(['reservation-create/', this.idEvent, 'date', idDate]);
  }

  private fetchEvent(): void {
    this.eventService
      .getEvent(this.idEvent)
      .pipe(first())
      .subscribe((event) => {
        this.event = event;
        this.eventsByDate = ApiEventMapper.toApiEventsByDate(this.event);
        this.calendarEvents = ApiEventByDateMapper.toCalendarEvents(this.eventsByDate);
        this.minDate = ApiEventByDateMapper.toMinData(this.eventsByDate);
        this.maxDate = ApiEventByDateMapper.toMaxData(this.eventsByDate);
        this.eventDates = ApiEventByDateMapper.toEventDates(this.eventsByDate);
      });
  }
}
