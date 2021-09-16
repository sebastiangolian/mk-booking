export interface SurveyItem {
  idSurveyItem: number;
  readonly question: string;
  readonly responses: string[];
  readonly defaultResponse: string;
  readonly required: boolean;
  readonly type: 'TEXT | YES_NO | CHOICE | MULTI_CHOICE | NUMBER';
  readonly order: number;
  response: string;
}
