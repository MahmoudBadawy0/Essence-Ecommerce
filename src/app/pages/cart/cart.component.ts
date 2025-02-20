import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  numOfItems: number = 0;
  cardItems: ICart = {} as ICart;

  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.cartService.getProducts().subscribe({
      next: (res) => {
        this.numOfItems = res.numOfCartItems;
        this.cardItems = res.data;
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
        this.numOfItems = res.numOfCartItems;
        this.cardItems = res.data;
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
        this.numOfItems = res.numOfCartItems;
        this.cardItems = res.data;
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
        console.log(res);
        this.numOfItems = 0;
        this.cardItems = {} as ICart;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
