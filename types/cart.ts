export interface CartItem {
  productId: string;
  name: string;
  code: string | null;
  quantity: number;
  notes?: string;
}
