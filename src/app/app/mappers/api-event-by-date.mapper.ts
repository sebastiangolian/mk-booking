import { CalendarEvent } from 'angular-calendar';
import { ApiEventByDate } from '../interfaces/api-event-by-date.interface';

export class ApiEventByDateMapper {
  static toCalendarEvent(apiEventByDate: ApiEventByDate): CalendarEvent {
    return {
      start: new Date(apiEventByDate.date),
      title: apiEventByDate.description,
    };
  }

  static toCalendarEvents(apiEventByDate: ApiEventByDate[]): CalendarEvent[] {
    const calendarEvents: CalendarEvent[] = [];
    apiEventByDate.forEach((event) => {
      const calendarEvent: CalendarEvent = {
        start: new Date(event.date),
        title: event.description,
      };
      calendarEvents.push(calendarEvent);
    });

    return calendarEvents;
  }

  static toMinData(apiEventByDate: ApiEventByDate[]): Date {
    const min = apiEventByDate.reduce(function (prev, current) {
      return prev.date < current.date ? prev : current;
    });
    return new Date(min.date);
  }

  static toMaxData(apiEventByDate: ApiEventByDate[]): Date {
    const max = apiEventByDate.reduce(function (prev, current) {
      return prev.date > current.date ? prev : current;
    });
    return new Date(max.date);
  }

  static toEventDates(apiEventByDate: ApiEventByDate[]): Date[] {
    return apiEventByDate.map((event) => new Date(event.date));
  }
}
