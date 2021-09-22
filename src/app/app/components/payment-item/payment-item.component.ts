import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Payment } from './../../interfaces/payment.interface';

@Component({
  selector: 'payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentItemComponent implements OnInit {
  @Input() payment!: Payment;
  constructor() {}

  ngOnInit(): void {}
}
