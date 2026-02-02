export enum OrderType {
  NORMAL = "NORMAL",
  VIP = "VIP",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
}

export const OrderPriority: Record<OrderType, number> = {
  [OrderType.VIP]: 0,
  [OrderType.NORMAL]: 1,
};
