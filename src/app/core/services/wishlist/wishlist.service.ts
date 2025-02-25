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

  constructor(private httpClient: HttpClient) {
    this.loadWishlist();
  }

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

  
  loadWishlist() {
    this.getWishlist().subscribe({
      next: (response) => {
        const productIds = response.data.map((item: any) => item._id); 
        this.wishlistItems.set(productIds);
      },
      error: (error) => {
        console.log('Error fetching wishlist:', error);
      },
    });
  }




}
