import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Event } from '../interfaces/event.interface';
import { ApiItems } from './../interfaces/api.items.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url: string = environment.api.endpoint + '/events';

  constructor(protected http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    const url = `${this.url}`;
    return this.http.get<ApiItems<Event>>(url).pipe(map((api) => api.items));
  }
}
