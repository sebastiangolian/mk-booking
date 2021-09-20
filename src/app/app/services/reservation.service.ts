import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiItem } from '../interfaces/api-item.interface';
import { Reservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private url: string = environment.api.endpoint + '/reservation';

  constructor(protected http: HttpClient) {}

  postReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${this.url}`;
    return this.http.post<ApiItem<Reservation>>(url, reservation).pipe(map((api) => api.item));
  }

  getReservation(idReservation: string): Observable<Reservation> {
    const url = `${this.url}/${idReservation}`;
    return this.http.get<ApiItem<Reservation>>(url).pipe(map((api) => api.item));
  }
}
