import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventItemComponent implements OnInit {
  @Input() event!: Event;
  constructor() {}

  ngOnInit(): void {}
}
