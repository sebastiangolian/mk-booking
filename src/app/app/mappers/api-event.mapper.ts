import { CalendarEvent } from 'angular-calendar';
import { ApiEventByDate } from '../interfaces/api-event-by-date.interface';
import { ApiDate } from './../interfaces/api-date.interface';
import { ApiEvent } from './../interfaces/api-event.interface';

export class ApiEventMapper {
  static toCalendarEvent(apiEvent: ApiEvent): CalendarEvent {
    return {
      start: new Date(apiEvent.dates[0].date),
      title: apiEvent.description,
    };
  }

  static toApiEventByDate(
    apiEvent: ApiEvent,
    date: string,
    apiDate: ApiDate
  ): ApiEventByDate {
    return {
      idEvent: apiEvent.idEvent,
      date: date,
      order: apiEvent.order,
      thumbnailUrl: apiEvent.thumbnailUrl,
      description: apiEvent.description,
      dates: [apiDate],
      survey: apiEvent.survey,
    };
  }
  static toApiEventsByDate(event: ApiEvent): ApiEventByDate[] {
    const apiEventsByDate: ApiEventByDate[] = [];

    event.dates.forEach((curDate) => {
      //first element
      if (apiEventsByDate.length === 0) {
        apiEventsByDate.push(
          ApiEventMapper.toApiEventByDate(event, curDate.date, curDate)
        );
      } else {
        const findIndex = apiEventsByDate.findIndex(
          (e) => e.date === curDate.date
        );

        if (findIndex > -1) {
          apiEventsByDate[findIndex].dates.push(curDate);
        } else {
          apiEventsByDate.push(
            ApiEventMapper.toApiEventByDate(event, curDate.date, curDate)
          );
        }
      }
    });

    return apiEventsByDate;
  }
}
