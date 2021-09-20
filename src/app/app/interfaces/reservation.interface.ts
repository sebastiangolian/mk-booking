import { Payment } from './payment.interface';
import { Survey } from './survey.interface';

export interface Reservation {
  idDate?: number;
  readonly idReservation?: string;
  readonly reservationNumber?: number;
  payment?: Payment;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  survey?: Survey;
}
