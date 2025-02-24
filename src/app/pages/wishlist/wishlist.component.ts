import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../shared/interfaces/iproduct';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  WritableSignal,
  signal,
} from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  // wishlistData: IProduct[] = [];

  wishlistData: WritableSignal<IProduct[]> = signal([]);
  wishlistDataUnsubscribe: Subscription = new Subscription();

  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.wishlistDataUnsubscribe = this.wishlistService
      .getWishlist()
      .subscribe({
        next: (response) => {
          this.wishlistData.set(response.data);
          console.log('wishlistData', response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  removeFromWishlist(prId: string) {
    this.wishlistService.removeFromWishlist(prId).subscribe({
      next: (response) => {
        this.getWishlist();
        this.wishlistService.wishlistItemsCount.set(response.data.length);
        console.log(response);
        this.toastr.success(response.message, 'Essence', {
          timeOut: 2000,
        });
      },
      error: (error) => {
        console.log(error);
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
        this.removeFromWishlist(id);
      }
    });
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.itemsCount.set(res.numOfCartItems);
        this.toastr.success(res.message, 'Essence', {
          timeOut: 2000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.wishlistDataUnsubscribe.unsubscribe();
  }
}
