
export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  isOrganic: boolean;
  discount: number | null;
  category: string;
}
