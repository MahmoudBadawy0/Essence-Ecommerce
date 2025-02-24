import { Allorders } from './../../shared/interfaces/allorders';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe, CurrencyPipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit, OnDestroy {
  userId: string = '';
  // allOrders: Allorders[] = [];
  allOrders: WritableSignal<Allorders[]> = signal([]);

  allOrdersUnsubscribe: Subscription = new Subscription();

  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.userOrders();
  }

  // allOrder() {
  //   this.orderService.getAllOrders().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  userOrders() {
    this.authService.tokenDecode();
    this.userId = this.authService.decodedToken.id;

    this.allOrdersUnsubscribe = this.orderService
      .getUserOrders(this.userId)
      .subscribe({
        next: (res) => {
          console.log('user data', res);
          this.allOrders.set(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.allOrdersUnsubscribe.unsubscribe();
  }
}
