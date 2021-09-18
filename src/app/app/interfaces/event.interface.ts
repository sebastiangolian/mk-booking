import { Date } from './date.interface';
import { Survey } from './survey.interface';

export interface Event {
  idEvent: number;
  order: number;
  thumbnailUrl: string;
  description: string;
  dates: Date;
  survey: Survey;
}
