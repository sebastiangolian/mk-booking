import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ApiEvent } from '../../interfaces/api-event.interface';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventItemComponent implements OnInit {
  @Input() event!: ApiEvent;
  constructor() {}

  ngOnInit(): void {}
}
