import { OrderType, OrderStatus, OrderPriority } from "../types";

export class Order {
  // static
  static completedCount: number = 0;
  static countByType: Record<OrderType, number> = {
    [OrderType.VIP]: 0,
    [OrderType.NORMAL]: 0,
  };

  static get totalCount(): number {
    return Object.values(Order.countByType).reduce((sum, count) => sum + count, 0);
  }

  // instance props
  public readonly createdAt: number = Date.now();
  private _status: OrderStatus = OrderStatus.PENDING;

  // constructor
  constructor(public readonly id: number, public readonly type: OrderType) {
    Order.countByType[type]++;
  }

  // instance getters
  get status(): OrderStatus {
    return this._status;
  }

  get priority(): number {
    return OrderPriority[this.type];
  }

  // instance methods
  process(): void {
    this._status = OrderStatus.PROCESSING;
  }

  complete(): void {
    this._status = OrderStatus.COMPLETE;
    Order.completedCount++;
  }

  reset(): void {
    this._status = OrderStatus.PENDING;
  }

  toString(): string {
    return `Order(${this.type}) #${this.id} - Status: ${this._status}`;
  }
}
