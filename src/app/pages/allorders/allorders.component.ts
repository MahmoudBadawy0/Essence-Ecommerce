import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Allorders } from '../../shared/interfaces/allorders';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe, CurrencyPipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  userId: string = '';
  allOrders: Allorders[] = [];
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    // this.allOrder();
    this.userOrders();
  }

  allOrder() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userOrders() {
    this.authService.tokenDecode();
    this.userId = this.authService.decodedToken.id;

    this.orderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        console.log('user data', res);
        this.allOrders = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
