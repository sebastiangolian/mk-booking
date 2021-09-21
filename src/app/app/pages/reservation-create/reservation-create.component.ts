import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiEvent } from './../../interfaces/api-event.interface';
import { Reservation } from './../../interfaces/reservation.interface';
import { EventService } from './../../services/event.service';
import { ReservationService } from './../../services/reservation.service';

@Component({
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss'],
})
export class ReservationCreateComponent implements OnInit {
  reservation: Reservation = {
    firstName: 'Jan',
    lastName: 'Testowy',
    email: 'takidotestow@gmail.com',
    phone: '777777777',
  };
  idEvent!: string;
  event!: ApiEvent;
  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const idDate = this.route.snapshot.paramMap.get('idDate');
    const idEvent = this.route.snapshot.paramMap.get('idEvent');
    if (idDate) {
      this.reservation.idDate = parseInt(idDate);
    }
    if (idEvent) {
      this.idEvent = idEvent;
      this.fetchEvent();
    }
  }

  onSubmit(f: NgForm) {
    this.reservationService
      .postReservation(this.reservation)
      .pipe(first())
      .subscribe((reservation) => {
        console.log(reservation);
        if (reservation.payment !== null && reservation.idReservation) {
          this.reservationService
            .postPayment(reservation.idReservation, { redirectAfterPaymentUrl: `${environment.redirectAfterPaymentUrl}${reservation.idReservation}` })
            .pipe(first())
            .subscribe((payment) => {
              window.location.href = payment.paymentUrl;
            });
        } else {
          this.router.navigate(['reservation-confirm', reservation.idReservation]);
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['events']);
  }

  private fetchEvent(): void {
    this.eventService
      .getEvent(this.idEvent)
      .pipe(first())
      .subscribe((event) => {
        this.event = event;
        this.reservation.survey = event.survey;
      });
  }
}
