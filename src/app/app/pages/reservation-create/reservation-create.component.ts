import { Component, OnInit, ViewChild } from '@angular/core';
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
  idEvent!: string;
  event!: ApiEvent;
  reservation: Reservation = { firstName: '', lastName: '', email: '', phone: '' };
  isValid: boolean = true;

  @ViewChild('f') f!: NgForm;
  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private eventService: EventService, private router: Router) {
    if (environment.name === 'dev') {
      this.reservation.firstName = 'Jan';
      this.reservation.lastName = 'Testowy';
      this.reservation.email = 'takidotestow@gmail.com';
      this.reservation.phone = '777777777';
    }
  }

  get isReservationValid(): boolean {
    if (this.f.valid) {
      return this.f.valid && this.isReservationSurveyValid;
    } else {
      return false;
    }
  }

  get isReservationSurveyValid(): boolean {
    if (this.reservation.survey) {
      return !this.reservation.survey.items.some((input) => (input.response === null || input.response === '') && input.required === true);
    } else {
      return true;
    }
  }

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

  onChange() {
    this.isValid = !this.isReservationValid;
  }

  onSubmit(f: NgForm) {
    this.reservationService
      .postReservation(this.reservation)
      .pipe(first())
      .subscribe((reservation) => this.router.navigate(['reservation-confirm', reservation.idReservation]));
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
