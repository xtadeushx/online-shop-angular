import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBasket, IProduct } from 'src/app/models/models.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor(private ProductsService: ProductsService) { }

  basket: IProduct[];
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription =
      this.ProductsService.getProductsFromBasket().subscribe(
        (data) => (this.basket = data)
      );
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProduct): void {
    if (item.quantity === 1) {
      this.ProductsService.deleteItemFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToBasket(item).subscribe();
    }
  }

  plusItemFromBasket(item: IProduct): void {
    item.quantity += 1;

    this.ProductsService.updateProductToBasket(item).subscribe();
  }
}
