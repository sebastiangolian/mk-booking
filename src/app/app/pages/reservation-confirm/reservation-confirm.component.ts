import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Reservation } from './../../interfaces/reservation.interface';
import { ReservationService } from './../../services/reservation.service';

@Component({
  templateUrl: './reservation-confirm.component.html',
  styleUrls: ['./reservation-confirm.component.scss'],
})
export class ReservationConfirmComponent implements OnInit {
  reservation!: Reservation;
  idReservation!: string;
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
      });
  }
}
