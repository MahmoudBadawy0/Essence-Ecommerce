import { Product } from './../../shared/interfaces/icart';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  productId: string = '';

  // productDetails: IProduct | null = null;
  productDetails: WritableSignal<IProduct> = signal({} as IProduct);
  ProductDetailsUnsubscribe: Subscription = new Subscription();

  // isLoading: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);

  // selectedImage: string | null = null;
  selectedImage: WritableSignal<string> = signal('');

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.ProductDetailsUnsubscribe = this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id')!;
        this.getSpecificProductData();
      },
    });
  }

  changeImage(newImage: string) {
    this.selectedImage.set(newImage);
  }

  getSpecificProductData() {
    this.productsService.getSpecificProduct(this.productId!).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addToCart() {
    this.isLoading.set(true);
    this.cartService.addProductToCart(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.itemsCount.set(res.numOfCartItems);
        this.toastr.success(res.message, 'Essence', {
          timeOut: 2000,
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.productId).subscribe({
      next: (response) => {
        console.log(response);
        this.wishlistService.wishlistItemsCount.set(response.data.length);
        this.toastr.success(response.message, 'Essence', {
          timeOut: 2000,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.ProductDetailsUnsubscribe.unsubscribe();
  }
}
