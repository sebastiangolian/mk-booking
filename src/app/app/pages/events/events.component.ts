import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/event.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]> = new Observable();
  constructor(protected eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
  }
}
