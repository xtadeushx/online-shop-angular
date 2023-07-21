import { Injectable } from '@angular/core';
import { IProduct } from '../models/models.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';


  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  };


  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  };

  postProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}`, product);
  };

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  };

  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  };

  postProductToBasket(product: IProduct) {
    return this.http.post<IProduct>(`${this.urlBasket}`, product)
  };

  getProductsFromBasket(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.urlBasket)
  };

  updateProductToBasket(product: IProduct) {
    return this.http.put<IProduct>(`${this.urlBasket}/${product.id}`, product);
  };

  deleteItemFromBasket(id: number) {
    return this.http.delete<IProduct>(`${this.urlBasket}/${id}`);
  }

}
