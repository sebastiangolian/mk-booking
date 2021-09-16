import { SurveyItem } from './survey-item.interface';
export interface Survey {
  idSurvey: number;
  readonly description: string;
  items: SurveyItem[];
}
