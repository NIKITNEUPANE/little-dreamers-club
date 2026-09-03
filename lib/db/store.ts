import {
  Product,
  Category,
  Collection,
  Order,
  Coupon,
  StoreContent,
  Review,
  UserProfile,
  OrderStatus,
} from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_STORE_CONTENT,
  INITIAL_ORDERS,
  DEMO_USER_PROFILE,
} from './seed-data';
import { supabase, isSupabaseConfigured } from '../supabase/client';

function mapSupabaseProduct(item: any): Product {
  const mediaList = Array.isArray(item.media) ? item.media : [];
  const images =
    mediaList.length > 0
      ? mediaList.map((m: any, i: number) => ({
          id: m.id || `img-${item.id}-${i}`,
          product_id: item.id,
          variant_id: m.color_key,
          image_url: m.url,
          alt_text: m.title || item.title || item.name || '',
          sort_order: i,
          is_primary: Boolean(m.is_primary ?? i === 0),
        }))
      : [
          {
            id: `img-${item.id}-0`,
            product_id: item.id,
            image_url:
              (Array.isArray(item.images) && item.images[0]) ||
              'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80',
            alt_text: item.title || item.name || '',
            sort_order: 0,
            is_primary: true,
          },
        ];

  const variants =
    item.product_variants && item.product_variants.length > 0
      ? item.product_variants.map((v: any) => ({
          id: v.id,
          product_id: item.id,
          sku: v.sku || `${item.sku || 'SKU'}-VAR`,
          size:
            v.option_combination?.Size ||
            v.option_combination?.size ||
            v.size ||
            'Standard',
          color:
            v.option_combination?.Color ||
            v.option_combination?.color ||
            v.color ||
            'Default',
          color_hex: v.color_hex || '#183B70',
          price: Number(v.price ?? item.base_price ?? 0),
          stock_quantity: Number(v.inventory_quantity ?? v.stock_quantity ?? 10),
          low_stock_threshold: 5,
        }))
      : [
          {
            id: `var-${item.id}-default`,
            product_id: item.id,
            sku: item.sku || 'SKU-DEFAULT',
            size: 'Standard',
            color: 'Default',
            color_hex: '#183B70',
            price: Number(item.base_price || 0),
            stock_quantity: Number(item.inventory_quantity ?? 10),
            low_stock_threshold: 5,
          },
        ];

  return {
    id: item.id,
    name: item.title || item.name || 'Untitled Product',
    slug: item.slug,
    description: item.description || '',
    short_description: item.short_description || '',
    sku: item.sku || 'SKU',
    base_price: Number(item.base_price || 0),
    compare_at_price: item.compare_price
      ? Number(item.compare_price)
      : item.compare_at_price
      ? Number(item.compare_at_price)
      : undefined,
    category_id: item.category_id || '',
    status: item.status || 'active',
    featured: Boolean(item.featured),
    rating: Number(item.rating || 5.0),
    review_count: Number(item.review_count || 0),
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at || new Date().toISOString(),
    images,
    variants,
  };
}

// Global In-Memory and Local Storage store for demo/hybrid mode
class LocalDataStore {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private collections: Collection[] = [...INITIAL_COLLECTIONS];
  private coupons: Coupon[] = [...INITIAL_COUPONS];
  private orders: Order[] = [...INITIAL_ORDERS];
  private storeContent: StoreContent = { ...INITIAL_STORE_CONTENT };
  private subscribers: string[] = ['parent1@example.com', 'nursery@example.com'];
  private userProfile: UserProfile = { ...DEMO_USER_PROFILE };

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const storedOrders = localStorage.getItem('ldc_orders');
        if (storedOrders) this.orders = JSON.parse(storedOrders);

        const storedProducts = localStorage.getItem('ldc_products');
        if (storedProducts) this.products = JSON.parse(storedProducts);

        const storedContent = localStorage.getItem('ldc_content');
        if (storedContent) this.storeContent = JSON.parse(storedContent);
      } catch (e) {
        console.error('Error loading persisted store:', e);
      }
    }
  }

  private persistOrders() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ldc_orders', JSON.stringify(this.orders));
    }
  }

  private persistProducts() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ldc_products', JSON.stringify(this.products));
    }
  }

  private persistContent() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ldc_content', JSON.stringify(this.storeContent));
    }
  }

  async getProducts(params?: {
    categorySlug?: string;
    collectionSlug?: string;
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    inStockOnly?: boolean;
    sort?: 'featured' | 'newest' | 'price-low' | 'price-high' | 'best-selling';
  }): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        // Direct Supabase query
        let query = supabase.from('products').select('*, product_variants(*)');
        if (params?.featured) query = query.eq('featured', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          let mapped = data.map(mapSupabaseProduct).filter((p) => p.status === 'active');
          if (params?.categorySlug) {
            const cat = this.categories.find((c) => c.slug === params.categorySlug);
            if (cat) mapped = mapped.filter((p) => p.category_id === cat.id);
          }
          if (params?.minPrice !== undefined) {
            mapped = mapped.filter((p) => p.base_price >= params.minPrice!);
          }
          if (params?.maxPrice !== undefined) {
            mapped = mapped.filter((p) => p.base_price <= params.maxPrice!);
          }
          return mapped;
        }
      } catch (e) {
        console.warn('Supabase fetch failed, fallback to local store:', e);
      }
    }

    let result = [...this.products].filter((p) => p.status === 'active');

    if (params?.categorySlug) {
      const cat = this.categories.find((c) => c.slug === params.categorySlug);
      if (cat) {
        result = result.filter((p) => p.category_id === cat.id);
      }
    }

    if (params?.collectionSlug) {
      const col = this.collections.find((c) => c.slug === params.collectionSlug);
      if (col) {
        result = result.filter((p) => p.collection_ids?.includes(col.id));
      }
    }

    if (params?.featured !== undefined) {
      result = result.filter((p) => p.featured === params.featured);
    }

    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.base_price >= params.minPrice!);
    }

    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.base_price <= params.maxPrice!);
    }

    if (params?.sizes && params.sizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => params.sizes!.includes(v.size))
      );
    }

    if (params?.colors && params.colors.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) =>
          params.colors!.some((c) => v.color.toLowerCase().includes(c.toLowerCase()))
        )
      );
    }

    if (params?.inStockOnly) {
      result = result.filter((p) =>
        p.variants.some((v) => v.stock_quantity > 0)
      );
    }

    // Sorting
    switch (params?.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.base_price - b.base_price);
        break;
      case 'price-high':
        result.sort((a, b) => b.base_price - a.base_price);
        break;
      case 'best-selling':
        result.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_variants(*)')
          .eq('slug', slug)
          .maybeSingle();
        if (!error && data) {
          return mapSupabaseProduct(data);
        }
      } catch (e) {
        console.warn('Supabase getProductBySlug failed, fallback to local:', e);
      }
    }
    const product = this.products.find((p) => p.slug === slug);
    return product || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_variants(*)')
          .eq('id', id)
          .maybeSingle();
        if (!error && data) {
          return mapSupabaseProduct(data);
        }
      } catch (e) {
        console.warn('Supabase getProductById failed, fallback to local:', e);
      }
    }
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  async getCategories(): Promise<Category[]> {
    return [...this.categories].sort((a, b) => a.sort_order - b.sort_order);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categories.find((c) => c.slug === slug) || null;
  }

  async getCollections(): Promise<Collection[]> {
    return [...this.collections];
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    return this.collections.find((c) => c.slug === slug) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    return this.products.filter(
      (p) =>
        p.status === 'active' &&
        (p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.category_name && p.category_name.toLowerCase().includes(q)) ||
          p.variants.some((v) => v.sku.toLowerCase().includes(q)))
    );
  }

  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; coupon?: Coupon; message?: string; discountAmount: number }> {
    const cleanCode = code.trim().toUpperCase();
    const coupon = this.coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!coupon) {
      return { valid: false, discountAmount: 0, message: 'Invalid or expired coupon code' };
    }

    if (coupon.minimum_order && subtotal < coupon.minimum_order) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Coupon requires a minimum order of Rs. ${coupon.minimum_order.toLocaleString()}`,
      };
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = (subtotal * coupon.discount_value) / 100;
      if (coupon.maximum_discount && discountAmount > coupon.maximum_discount) {
        discountAmount = coupon.maximum_discount;
      }
    } else {
      discountAmount = coupon.discount_value;
    }

    return {
      valid: true,
      coupon,
      discountAmount: Math.min(discountAmount, subtotal),
    };
  }

  async createOrder(orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>): Promise<Order> {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `LDC-2026-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Deduct stock quantities from variants
    for (const item of newOrder.items) {
      for (const prod of this.products) {
        const variant = prod.variants.find((v) => v.id === item.product_variant_id);
        if (variant) {
          variant.stock_quantity = Math.max(0, variant.stock_quantity - item.quantity);
        }
      }
    }

    this.orders.unshift(newOrder);
    this.persistOrders();
    this.persistProducts();

    return newOrder;
  }

  async getOrders(filterUserEmailOrId?: string, isAdmin: boolean = false): Promise<Order[]> {
    if (isAdmin) {
      return [...this.orders];
    }
    if (!filterUserEmailOrId) return [];

    return this.orders.filter(
      (o) =>
        o.user_id === filterUserEmailOrId ||
        o.guest_email?.toLowerCase() === filterUserEmailOrId.toLowerCase() ||
        o.shipping_address.email?.toLowerCase() === filterUserEmailOrId.toLowerCase()
    );
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orders.find((o) => o.order_number === orderNumber) || null;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.find((o) => o.id === id) || null;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;

    order.status = status;
    if (trackingNumber) order.tracking_number = trackingNumber;
    if (carrier) order.carrier = carrier;
    order.updated_at = new Date().toISOString();

    this.persistOrders();
    return order;
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    this.persistProducts();
    return newProduct;
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    this.products[idx] = {
      ...this.products[idx],
      ...productData,
      updated_at: new Date().toISOString(),
    };
    this.persistProducts();
    return this.products[idx];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.products[idx].status = 'archived';
    this.persistProducts();
    return true;
  }

  async getCoupons(): Promise<Coupon[]> {
    return [...this.coupons];
  }

  async createCoupon(coupon: Omit<Coupon, 'id' | 'usage_count'>): Promise<Coupon> {
    const newCoupon: Coupon = {
      ...coupon,
      id: `coup-${Date.now()}`,
      usage_count: 0,
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const clean = email.trim().toLowerCase();
    if (!clean.includes('@') || !clean.includes('.')) {
      return { success: false, message: 'Please provide a valid email address.' };
    }
    if (this.subscribers.includes(clean)) {
      return { success: true, message: "You're already subscribed to Little Dreamers Club!" };
    }
    this.subscribers.push(clean);
    return { success: true, message: 'Welcome to the Little Dreamers Club family! ✨' };
  }

  async addReview(productId: string, review: Omit<Review, 'id' | 'created_at' | 'approved'>): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      approved: true,
      created_at: new Date().toISOString(),
    };

    const prod = this.products.find((p) => p.id === productId);
    if (prod) {
      prod.reviews = prod.reviews || [];
      prod.reviews.unshift(newReview);
      prod.review_count = prod.reviews.length;
      const avg = prod.reviews.reduce((acc, r) => acc + r.rating, 0) / prod.reviews.length;
      prod.rating = parseFloat(avg.toFixed(2));
      this.persistProducts();
    }

    return newReview;
  }

  async getStoreContent(): Promise<StoreContent> {
    return { ...this.storeContent };
  }

  async updateStoreContent(section: keyof StoreContent, data: any): Promise<StoreContent> {
    this.storeContent[section] = {
      ...this.storeContent[section],
      ...data,
    };
    this.persistContent();
    return { ...this.storeContent };
  }

  async getUserProfile(): Promise<UserProfile> {
    return { ...this.userProfile };
  }
}

export const db = new LocalDataStore();
