import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allProducts: IProduct[] = [];
  allCategories: ICategory[] = [];

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left text-[#855825] dark:text-white"></i>',
      '<i class="fas fa-chevron-right text-[#855825] dark:text-white"></i>',
    ],
    responsive: {
      0: {
        items: 2,
        margin: 10,
      },
      640: {
        items: 3,
        margin: 20,
      },
      1024: {
        items: 4,
        margin: 20,
      },
      1280: {
        items: 5,
        margin: 30,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
  };

  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 900,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };

  heroOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  };

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
  }

  getProductsData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (err) => console.log(err),
      // complete: () => console.log('complete'),
    });
  }

  getCategoryData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allCategories = res.data;
      },
      error: (err) => console.log(err),
      // complete: () => console.log('complete'),
    });
  }
}
