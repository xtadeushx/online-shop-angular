export interface IProduct {
  id: number,
  title: string,
  price: string,
  year: string,
  image?: string,
  quantity: number,
  configure: IConfigure
}

interface IConfigure {
  chip?: string,
  ssd?: string,
  memory?: string,
  display?: string
}