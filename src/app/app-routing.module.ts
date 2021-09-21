import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './app/pages/event/event.component';
import { EventsComponent } from './app/pages/events/events.component';
import { ReservationConfirmComponent } from './app/pages/reservation-confirm/reservation-confirm.component';
import { ReservationCreateComponent } from './app/pages/reservation-create/reservation-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '*', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'events/:idEvent', component: EventComponent },
  { path: 'reservation-create/:idEvent/date/:idDate', component: ReservationCreateComponent },
  { path: 'reservation-confirm/:idReservation', component: ReservationConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
