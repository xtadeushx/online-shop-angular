import { IProduct } from "../products/products.interface";

export interface IBasket extends IProduct {
  quantity: number
}