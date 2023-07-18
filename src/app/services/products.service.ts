import { Injectable } from '@angular/core';
import { IProduct } from '../models/models.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000/products'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url)
  };


  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`)
  };

  postProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}`, product)
  }
}
