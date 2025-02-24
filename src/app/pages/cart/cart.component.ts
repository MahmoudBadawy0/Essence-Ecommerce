import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  numOfItems: Signal<number> = computed(() => this.cartService.itemsCount());

  // cardItems: ICart = {} as ICart;
  cardItems: WritableSignal<ICart> = signal({} as ICart);
  cardItemsUnsubscribe: Subscription = new Subscription();

  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.cardItemsUnsubscribe = this.cartService.getProducts().subscribe({
      next: (res) => {
        this.cardItems.set(res.data);
        console.log('card item', this.cardItems());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemAlert(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove item',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeItemService(id);
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your item has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  }

  removeItemService(id: string) {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.getAllProducts();
        this.cartService.itemsCount.set(res.numOfCartItems);
        this.cardItems.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateItemQuantity(id: string, count: number) {
    this.cartService.updateQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.itemsCount.set(res.numOfCartItems);
        this.cardItems.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCartAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove all',
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your cart items has been deleted.',
        //   icon: 'success',
        // });
        this.clearCartService();
      }
    });
  }

  clearCartService() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartService.itemsCount.set(0);
        console.log(res);
        this.cardItems.set({} as ICart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.cardItemsUnsubscribe.unsubscribe();
  }
}
