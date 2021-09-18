export interface Payment {
  idPayment: string;
  isProgress: boolean;
  canStartNewPayment: boolean;
  status: string;
  paymentUrl: string;
  description: string;
  startedAt: string;
  mustBeCompletedBefore: string;
}
