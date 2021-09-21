import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiItem } from '../interfaces/api-item.interface';
import { PaymentRegistration } from '../interfaces/payment-registration.interface';
import { Reservation } from '../interfaces/reservation.interface';
import { Payment } from './../interfaces/payment.interface';

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

  postPayment(idReservation: string, paymentRegistration: PaymentRegistration): Observable<Payment> {
    const url = `${this.url}/${idReservation}/payment`;
    return this.http.post<ApiItem<Payment>>(url, paymentRegistration).pipe(map((api) => api.item));
  }

  getPayment(idReservation: string): Observable<Payment> {
    const url = `${this.url}/${idReservation}/payment`;
    return this.http.get<ApiItem<Payment>>(url).pipe(map((api) => api.item));
  }
}
