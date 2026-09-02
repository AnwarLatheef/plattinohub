export interface Rewards {
  productId: string;
  requiredPoints: number;
  currentPoints: number;
  remainingPoints: number;
  progress: number;
  message: string;
  canRedeem: boolean;
}