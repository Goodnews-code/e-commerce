export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  rating: number;
  reviews: number;
  tags: string[];
  in_stock: boolean;
  created_at: string;
}
