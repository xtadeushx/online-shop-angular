export interface IProduct {
  id: number,
  title: string,
  price: string,
  year: string,
  image?: string,
  configure: IConfigure
}

interface IConfigure {
  chip?: string,
  ssd?: string,
  memory?: string,
  display?: string
}