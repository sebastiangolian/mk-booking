import { ApiDate } from './api-date.interface';
import { Survey } from './survey.interface';

export interface ApiEventByDate {
  idEvent: number;
  date: Date;
  order: number;
  thumbnailUrl: string;
  description: string;
  dates: ApiDate[];
  survey: Survey;
}
