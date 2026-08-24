export type UserRole = 'customer' | 'admin' | 'staff';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  default_shipping_address?: ShippingAddress;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string | null;
  sort_order: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  featured: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: string; // e.g. "0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "One Size"
  color: string; // e.g. "Dusty Lavender", "Warm Cream", "Soft Blush", "Muted Gold"
  color_hex: string;
  price: number;
  stock_quantity: number;
  low_stock_threshold: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  variant_id?: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  reviewer_name: string;
  order_id?: string;
  rating: number;
  title: string;
  body: string;
  approved: boolean;
  verified_purchase: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  sku: string;
  base_price: number;
  compare_at_price?: number;
  category_id: string;
  category_name?: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  rating: number;
  review_count: number;
  materials?: string;
  care_instructions?: string;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants: ProductVariant[];
  collection_ids?: string[];
  reviews?: Review[];
}

export interface MonogramCustomization {
  text: string;
  font: 'script' | 'roman' | 'serif';
  fontLabel: string;
  threadColor: string;
  threadName: string;
  placement: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  monogram?: MonogramCustomization;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'COD';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  provinceState: string;
  postalCode: string;
  country: string;
  deliveryNotes?: string;
}

export interface OrderItemSnapshot {
  id: string;
  product_variant_id: string;
  product_name: string;
  variant_details: string; // e.g. "Size: 6-12M / Color: Lavender"
  image_url: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  guest_email?: string;
  guest_phone?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  coupon_code?: string;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  notes?: string;
  tracking_number?: string;
  carrier?: string;
  items: OrderItemSnapshot[];
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order: number;
  maximum_discount?: number;
  starts_at: string;
  expires_at?: string;
  usage_limit?: number;
  usage_count: number;
  active: boolean;
}

export interface StoreContent {
  announcement_bar: {
    enabled: boolean;
    text: string;
    link_text: string;
    link_url: string;
    free_shipping_threshold: number;
  };
  hero_section: {
    badge: string;
    headline: string;
    subheadline: string;
    primary_cta_text: string;
    primary_cta_link: string;
    secondary_cta_text: string;
    secondary_cta_link: string;
    image_url: string;
  };
  promo_editorial: {
    badge: string;
    headline: string;
    subheadline: string;
    cta_text: string;
    cta_link: string;
    image_url: string;
  };
  social_items: {
    id: string;
    image_url: string;
    caption: string;
    link: string;
    handle: string;
  }[];
  store_settings: {
    store_name: string;
    support_email: string;
    support_phone: string;
    currency: string;
    currency_symbol: string;
    standard_shipping_fee: number;
    express_shipping_fee: number;
    free_shipping_threshold: number;
    tax_rate: number;
  };
}
