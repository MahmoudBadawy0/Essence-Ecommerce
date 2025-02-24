import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../shared/interfaces/ibrand';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandService = inject(BrandService);

  // allCategories: ICategory[] = [];
  allCategories: WritableSignal<ICategory[]> = signal([]);
  allCategoriesUnsubscribe: Subscription = new Subscription();

  // allBrands: IBrand[] = [];
  allBrands: WritableSignal<IBrand[]> = signal([]);
  allBrandsUnsubscribe: Subscription = new Subscription();

  p: number = 1;
  itemPrPage: number = 10;
  ngOnInit(): void {
    this.getCategoryData();
    this.getBrands();
  }
  getCategoryData() {
    this.allCategoriesUnsubscribe = this.categoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.allCategories.set(res.data);
          console.log(this.allCategories);
        },
        error: (err) => console.log(err),
      });
  }

  getBrands() {
    this.allBrandsUnsubscribe = this.brandService.getBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands.set(res.data);
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.allCategoriesUnsubscribe.unsubscribe();
    this.allBrandsUnsubscribe.unsubscribe();
  }
}

//
