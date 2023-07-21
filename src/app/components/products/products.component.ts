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
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) { }

  Image: string = '../../../assets/images/macbook.jpeg';

  products: IProduct[] = [];
  productSubscription: Subscription;

  basket: IProduct[] = [];
  basketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  ngOnInit(): void {
    this.canEdit = true;

    this.productSubscription = this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));

    this.basketSubscription = this.productService
      .getProductsFromBasket()
      .subscribe((data) => (this.basket = data));
  }
  // =================Basket =============================
  addToBasket(product: IProduct): void {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find(item => item.id === product.id);
      if (findItem) {
        this.updateToBasket(findItem);
      } else {
        this.postToBasket(product);
      }
    } else {
      this.postToBasket(product);
    }
  }

  postToBasket(product: IProduct) {
    this.productService
      .postProductToBasket(product)
      .subscribe((data) => this.basket.push(data));
  }

  updateToBasket(product: IProduct) {
    if (product.quantity) {
      product.quantity++;
    }
    this.productService
      .updateProductToBasket(product)
      .subscribe((data) => {
      });
  }

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) {
          this.updateData(data);
        } else {
          this.postData(data);
        }
      }
    });
  }

  postData(data: IProduct) {
    this.productService
      .postProduct(data)
      .subscribe((data) => this.products.push(data));
  }

  updateData(data: IProduct) {
    this.productService.updateProduct(data).subscribe((data) => {
      this.products = this.products.map((pr) => {
        if (pr.id === data.id) {
          return data;
        } else {
          return pr;
        }
      });
    });
  }

  deleteItem(id: number) {
    this.productService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          let idx = this.products.findIndex((data) => data.id === id);
          this.products.splice(idx, 1);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();

    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
