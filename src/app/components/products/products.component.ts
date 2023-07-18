import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/models.interface';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  Image: string = '../../../assets/images/macbook.jpeg';
  products: IProduct[] = [];
  productSubscription: Subscription
  canEdit: boolean = false;

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog) { }

  openDialog(): void {
    // let dialogConfig = new DialogConfig();
    // dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      disableClose: true,
    });

  }

  ngOnInit(): void {
    this.canEdit = true;
    this.productSubscription = this.productService.getProducts().subscribe(data => this.products = data);
  };

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  };
}
