import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [
    TranslatePipe,
    RouterLink,
    CurrencyPipe,
    SearchPipe,
    FormsModule,
    SortPipe,
    NgxPaginationModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  p: number = 1;
  itemPrPage: number = 30;

  wishlistItemsCheck: Signal<String[]> = computed(() =>
    this.wishlistService.wishlistItems()
  );



  
  // allProducts: IProduct[] = [];

  allProducts: WritableSignal<IProduct[]> = signal([]);
  allProductsUnSubscription: Subscription = new Subscription();

  // searchInput: string = '';
  // sortInput: string = '';

  searchInput: WritableSignal<string> = signal('');
  sortInput: WritableSignal<string> = signal('');

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getProductsData();
  }
  getProductsData() {
    this.allProductsUnSubscription = this.productsService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          this.allProducts.set(res.data);
          console.log(this.allProducts());
        },
        error: (err) => console.log(err),
      });
  }
  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
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

  pageChangePagination(event: number) {
    this.p = event;
    window.scrollTo({ top: 1, behavior: 'smooth' });
  }

  addToWishlist(prId: string) {
    this.wishlistService.addToWishlist(prId).subscribe({
      next: (response) => {
        this.wishlistService.wishlistItemsCount.set(response.data.length);
        console.log('addToWishlistProduct', response.data.length, response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromWishlist(prId: string) {
    this.wishlistService.removeFromWishlist(prId).subscribe({
      next: (response) => {
        this.wishlistService.wishlistItemsCount.set(response.data.length);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  toggleWishlist(prId:string): void {
    if (this.wishlistItemsCheck().includes(prId))
    {this.wishlistService.wishlistItems().splice(this.wishlistService.wishlistItems().findIndex((i) => i === prId),1); // Remove item in component
      this.removeFromWishlist(prId);
      console.log('removed : ', prId);
    } else {
      this.addToWishlist(prId);
      this.wishlistService.wishlistItems().push(prId); // Add item in component
      console.log('added : ', prId);
    }
  }


  isInWishlist(prId:string): boolean {
    return this.wishlistItemsCheck().includes(prId);
  }











  ngOnDestroy(): void {
    this.allProductsUnSubscription.unsubscribe();
  }
}
