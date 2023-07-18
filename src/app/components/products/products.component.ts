import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  ngOnInit(): void {
    this.canEdit = true;
    this.productSubscription = this.productService.getProducts().subscribe(data => this.products = data);
  };

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) { this.updateData(data); }
        else { this.postData(data); }
      }
    });
  }

  postData(data: IProduct) {
    this.productService.postProduct(data).subscribe(data => this.products.push(data))
  }

  updateData(data: IProduct) {
    this.productService.updateProduct(data).subscribe(data => this.products.push(data))
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  };

  deleteItem(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }
}
