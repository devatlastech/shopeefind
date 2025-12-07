export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string | null;
  original_price: number;
  discount_price: number;
  discount_percentage: number;
  affiliate_link: string;
  images: string[];
  video_url: string | null;
  category_id: string | null;
  tags: string[];
  status: 'active' | 'inactive' | 'featured';
  click_count: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductClick {
  id: string;
  product_id: string;
  clicked_at: string;
  referrer: string | null;
  device_type: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}
