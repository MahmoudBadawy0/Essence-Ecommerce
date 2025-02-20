import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  productId: string = '';
  productDetails: IProduct | null = null;
  isLoading: boolean = false;
  selectedImage: string | null = null;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id')!;
        this.getSpecificProductData();
      },
    });
  }

  changeImage(newImage: string) {
    this.selectedImage = newImage;
  }

  getSpecificProductData() {
    this.productsService.getSpecificProduct(this.productId!).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addToCart() {
    this.isLoading = true;
    this.cartService.addProductToCart(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'Essence', {
          timeOut: 2000,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
