import { Injectable } from '@angular/core';
import { IProduct } from '../models/models.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: IProduct[] = []

  constructor() { }
}
