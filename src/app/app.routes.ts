import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { authGuard } from './core/guards/auth.guard';
import { logedinGuard } from './core/guards/logedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        title: 'Essence - Login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'Essence - Register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
    canActivate: [logedinGuard],
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'home',
        title: 'Essence - Home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'cart',
        title: 'Essence - Cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'product',
        title: 'Essence - Product',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'categories',
        title: 'Essence - Categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'brands',
        title: 'Essence - Brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      {
        path: 'details/:id',
        title: 'Essence - Details',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },

      {
        path: '**',
        title: 'Essence - NotFound',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
      },
    ],
    canActivate: [authGuard],
  },
];
