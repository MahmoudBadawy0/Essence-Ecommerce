import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  userToken: any = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) {}

  cashOrder(data: object, cartId: string): Observable<any> {
    return this.httpClient.post(
      `${environments.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      },

    );
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${environments.baseUrl}/api/v1/orders`);
  }

  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(
      `${environments.baseUrl}/api/v1/orders/user/${userId}`
    );
  }

  onlineOrder(data: object, cartId: string): Observable<any> {
    return this.httpClient.post(
      `${environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      },
    );
  }

  
}
