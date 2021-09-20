import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SurveyItem } from './../../interfaces/survey-item.interface';

@Component({
  selector: 'survey-item',
  templateUrl: './survey-item.component.html',
  styleUrls: ['./survey-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyItemComponent implements OnInit {
  @Input() surveyItem!: SurveyItem;

  pattern!: string;
  patternNumber: string = '[0-9]*';
  patternText: string = '[[0-9a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż ."-]*';

  ngOnInit(): void {
    if (this.surveyItem.type === 'TEXT') {
      this.pattern = this.patternText;
    }

    if (this.surveyItem.type === 'NUMBER') {
      this.pattern = this.patternNumber;
    }
  }
}
