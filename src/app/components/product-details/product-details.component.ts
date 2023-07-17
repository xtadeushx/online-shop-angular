import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/models.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct
  productSubscription: Subscription
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe(
      data => this.product = data['data']
    )
  }
}
