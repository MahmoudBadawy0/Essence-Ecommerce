import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  productId: string | null = '';
  productDetails: IProduct | null = null;

  selectedImage: string | null = null;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
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
}
