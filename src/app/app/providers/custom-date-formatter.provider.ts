import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    if (locale) {
      return formatDate(date, 'HH:mm', locale);
    } else {
      return '';
    }
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
