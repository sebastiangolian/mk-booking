import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../../interfaces/reservation.interface';

@Component({
  selector: 'survey-items',
  templateUrl: './survey-items.component.html',
  styleUrls: ['./survey-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyItemsComponent implements OnInit {
  @Input() reservation!: Reservation;
  constructor() {}

  ngOnInit(): void {}
}
