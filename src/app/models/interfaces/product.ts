export interface Product {
  title: string;
  price: string;
  productImage: string;
  stock: number;
  isOutOfStock?: boolean;
  categories?: string[];
  description?: string;
}
