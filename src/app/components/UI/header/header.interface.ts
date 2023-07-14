export interface ILink {
  path: string;
  label: LABELS;
}

export enum LABELS {
  HOME = 'home',
  PRODUCTS = 'products',
  BASKET = 'basket'
}

export enum PATHS {
  ROOT = '/',
  PRODUCTS = 'products',
  BASKET = 'basket'

}