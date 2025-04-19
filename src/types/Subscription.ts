export interface SubscriptionPackage {
  id?: string;
  name: string;
  description: string;
  duration: number;
  pricePercentage: number;
  features: string[];
  isActive: boolean;
  isRecommended?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// /types/subscription.ts
export interface UserSubscription {
  id?: string;
  userId: string;
  packageId: string;
  packageName: string;
  startDate: Date;
  endDate: Date;
  price: number;
  duration: number; // in months
  status: 'active' | 'expired' | 'canceled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}