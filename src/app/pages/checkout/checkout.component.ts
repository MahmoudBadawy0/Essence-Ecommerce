import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cartId: string = '';
  payType: string = '';
  isLoading: boolean = false;
  egyptGovernorates: string[] = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Sharqia',
    'Dakahlia',
    'Beheira',
    'Qalyubia',
    'Monufia',
    'Gharbia',
    'Kafr El Sheikh',
    'Fayoum',
    'Beni Suef',
    'Minya',
    'Asyut',
    'Sohag',
    'Qena',
    'Luxor',
    'Aswan',
    'Red Sea',
    'New Valley',
    'Matrouh',
    'North Sinai',
    'South Sinai',
    'Suez',
    'Ismailia',
    'Port Said',
    'Damietta',
  ];

  checkoutForm!: FormGroup;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getCartId();
    this.getPayType();
    this.initForm();
  }

  getCartId() {
    this.cartId = this.activatedRoute.snapshot.paramMap.get('CartId')!;
  }
  getPayType() {
    this.payType = this.activatedRoute.snapshot.paramMap.get('payType')!;
  }

  initForm() {
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),

      city: new FormControl(null, [Validators.required]),

      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    });
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
    if (this.payType === 'Online') {
      this.onlinePayment();
    } else if (this.payType === 'cash') {
      this.cashPayment();
    }
  }

  onlinePayment() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;

      this.orderService
        .onlineOrder(this.checkoutForm.value, this.cartId)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              open(res.session.url, '_self');
            }

            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  cashPayment() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      this.orderService
        .cashOrder(this.checkoutForm.value, this.cartId)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.router.navigate(['/allorders']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
