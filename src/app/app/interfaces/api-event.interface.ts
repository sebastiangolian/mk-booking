import { ApiDate } from './api-date.interface';
import { Survey } from './survey.interface';

export interface ApiEvent {
  idEvent: number;
  order: number;
  thumbnailUrl: string;
  description: string;
  dates: ApiDate[];
  survey: Survey;
}
