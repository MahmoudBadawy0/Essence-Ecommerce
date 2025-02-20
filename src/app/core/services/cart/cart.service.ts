import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userToken: any = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) {}

  addProductToCart(proId: string): Observable<any> {
    return this.httpClient.post(
      `${environments.baseUrl}/api/v1/cart`,
      {
        productId: proId,
      }

    );
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/api/v1/cart`);
  }

  updateQuantity(id: string, num: number): Observable<any> {
    return this.httpClient.put(
      `${environments.baseUrl}/api/v1/cart/${id}`,
      {
        count: num,
      }

    );
  }

  removeSpecificCartItem(proId: string): Observable<any> {
    return this.httpClient.delete(
      `${environments.baseUrl}/api/v1/cart/${proId}`
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environments.baseUrl}/api/v1/cart`);
  }
}
