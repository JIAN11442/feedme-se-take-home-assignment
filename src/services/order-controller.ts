import { Order } from "../models/order";
import { Bot } from "../models/bot";
import { BotManager } from "./bot-manager";
import { OrderQueue } from "./order-queue";
import { log } from "../utils/logger";
import { OrderType } from "../types";

export class OrderController {
  private orderQueue: OrderQueue;
  private botManager: BotManager;
  private nextOrderId: number = 1001;

  constructor() {
    this.orderQueue = new OrderQueue();
    this.botManager = new BotManager(this.orderQueue);
  }

  addOrder(type: OrderType): Order {
    const order = new Order(this.nextOrderId++, type);
    this.orderQueue.add(order);
    log(`Created ${order.toString()}`);

    this.botManager.dispatchNextOrderAndProcess();
    return order;
  }

  addBot() {
    return this.botManager.addBot();
  }

  removeBot() {
    return this.botManager.removeBot();
  }

  getStats() {
    return {
      totalOrders: Order.totalCount,
      countByType: Order.countByType,
      completedCount: Order.completedCount,
      activeBots: this.botManager.activeBotCount,
      destroyedBots: Bot.destroyedCount,
      pendingOrders: this.orderQueue.pendingCount,
    };
  }
}
