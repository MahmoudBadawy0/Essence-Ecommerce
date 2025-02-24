import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { authGuard } from './core/guards/auth.guard';
import { logedinGuard } from './core/guards/logedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Authentication
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
      {
        path: 'resetpassword',
        title: 'Essence - Reset password',
        loadComponent: () =>
          import('./pages/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
      },
    ],
    canActivate: [logedinGuard],
  },

  // Blank
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
        path: 'wishlist',
        title: 'Essence - wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },

      {
        path: 'product',
        title: 'Essence - Product',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      // {
      //   path: 'categories',
      //   title: 'Essence - Categories',
      //   loadComponent: () =>
      //     import('./pages/categories/categories.component').then(
      //       (m) => m.CategoriesComponent
      //     ),
      // },
      {
        path: 'brands',
        title: 'Essence - Brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      {
        path: 'allorders',
        title: 'Essence - All Orders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
      },

      {
        path: 'about',
        title: 'Essence - About',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
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
        path: 'checkout/:payType/:CartId',
        title: 'Essence - Checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
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
