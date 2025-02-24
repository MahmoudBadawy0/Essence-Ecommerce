import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistItemsCount: WritableSignal<number> = signal(0);

  wishlistItems: WritableSignal<String[]> = signal([]);

  constructor(private httpClient: HttpClient) {}

  addToWishlist(prId: string): Observable<any> {
    return this.httpClient.post(`${environments.baseUrl}/api/v1/wishlist`, {
      productId: prId,
    });
  }

  removeFromWishlist(prId: string): Observable<any> {
    return this.httpClient.delete(
      `${environments.baseUrl}/api/v1/wishlist/${prId}`
    );
  }

  getWishlist(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/api/v1/wishlist`);
  }

  checkItemInWishlist(prId: string) {
    const index = this.wishlistItems().findIndex((i) => i === prId);

    if (index === -1) {
      return false;
    } else {
      this.wishlistItems().splice(index, 1);
      return true;
    }
  }
}
