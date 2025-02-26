import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import {
  Component,
  computed,
  inject,
  input,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { DarkmodeService } from '../../core/services/darkmode/darkmode.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // @Input() isLogin:boolean=true
  isLogin = input<boolean>(true);
  cartCount: Signal<number> = computed(() => this.cartService.itemsCount());
  wishlistCount: Signal<number> = computed(() =>
    this.wishlistService.wishlistItemsCount()
  );

  readonly authService = inject(AuthService);
  private readonly myTranslateService = inject(MyTranslateService);
  readonly translateService = inject(TranslateService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  readonly darkmodeService = inject(DarkmodeService);

  ngOnInit(): void {
    this.getCartCount();
    this.getWishlistCount();
    this.wishlistService.loadWishlist();
  }

  isMenuOpen = false;
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDarkMode() {
    this.darkmodeService.updateDarkMode();
  }

  getCartCount() {
    this.cartService.getProducts().subscribe({
      next: (res) => {
        this.cartService.itemsCount.set(res.numOfCartItems);
      },
    });
  }

  getWishlistCount() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistService.wishlistItemsCount.set(res.count);
      },
    });
  }

  change(lang: string) {
    this.myTranslateService.changeLangAndDir(lang);
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}
