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

export interface UserSubscription {
 userId: string;
 packageId: string;
 startDate: Date;
 endDate: Date;
 isActive: boolean;
 paymentStatus: "pending" | "paid" | "failed" | "refunded";
 salesPercentage: number;
 createdAt: Date;
 updatedAt: Date;
}
