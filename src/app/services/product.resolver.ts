import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/models.interface';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ProductsService } from './products.service';



@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<IProduct> {
  constructor(private productService: ProductsService, private router: Router) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    return this.productService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/products']);
        return EMPTY
      })
    )
  }

}