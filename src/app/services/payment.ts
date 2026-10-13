import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaymentRequest } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {
  }

  createPayment(payment: PaymentRequest): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      payment
    );
  }
}