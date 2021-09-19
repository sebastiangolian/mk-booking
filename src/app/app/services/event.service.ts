import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiItem } from '../interfaces/api-item.interface';
import { ApiEvent } from './../interfaces/api-event.interface';
import { ApiItems } from './../interfaces/api.items.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url: string = environment.api.endpoint + '/events';

  constructor(protected http: HttpClient) {}

  getEvents(): Observable<ApiEvent[]> {
    const url = `${this.url}`;
    return this.http.get<ApiItems<ApiEvent>>(url).pipe(map((api) => api.items));
  }

  getEvent(idEvent: string): Observable<ApiEvent> {
    const url = `${this.url}/${idEvent}`;
    return this.http.get<ApiItem<ApiEvent>>(url).pipe(map((api) => api.item));
  }
}
