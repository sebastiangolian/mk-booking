import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, first, repeatWhen, takeUntil, tap } from 'rxjs/operators';
import { Payment } from './../../interfaces/payment.interface';
import { Reservation } from './../../interfaces/reservation.interface';
import { ReservationService } from './../../services/reservation.service';

@Component({
  templateUrl: './reservation-confirm.component.html',
  styleUrls: ['./reservation-confirm.component.scss'],
})
export class ReservationConfirmComponent implements OnInit {
  reservation!: Reservation;
  idReservation!: string;
  stopRequesting: Subject<boolean> = new Subject<boolean>();
  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {}

  ngOnInit(): void {
    const idReservation = this.route.snapshot.paramMap.get('idReservation');
    if (idReservation) {
      this.idReservation = idReservation;
      this.fetchReservation();
    }
  }

  private fetchReservation(): void {
    this.reservationService
      .getReservation(this.idReservation)
      .pipe(first())
      .subscribe((reservation) => {
        this.reservation = reservation;
        if (this.reservation.payment) {
          this.fetchPayment();
        }
      });
  }

  private fetchPayment(): void {
    this.reservationService
      .getPayment(this.idReservation)
      .pipe(
        repeatWhen((completed) => completed.pipe(delay(3000))),
        tap((payment: Payment) => {
          if (payment) {
            if (payment.isProgress === false) {
              this.stopRequesting.next(true);
            }
          }
        }),
        takeUntil(this.stopRequesting.pipe(delay(2000))),
      )
      .subscribe((payment) => {
        this.reservation.payment = payment;
      });
  }
}
