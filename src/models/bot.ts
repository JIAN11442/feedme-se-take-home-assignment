import { Order } from "./order";
import { log } from "../utils/logger";

export class Bot {
  static destroyedCount: number = 0;

  private currentOrder: Order | null = null;
  private timer: NodeJS.Timeout | null = null;

  constructor(public readonly id: number, private onComplete: () => void) {}

  get isIdle(): boolean {
    return this.currentOrder === null;
  }

  process(order: Order): void {
    // store order for stop()
    this.currentOrder = order;

    // pending -> processing
    order.process();
    log(`Bot #${this.id} started processing ${order.toString()}`);

    this.timer = setTimeout(() => {
      // processing -> complete
      order.complete();
      log(`Bot #${this.id} completed ${order.toString()}`);

      // reset
      this.currentOrder = null;
      this.timer = null;

      // dispatch and process next order
      this.onComplete();
    }, 10000);
  }

  stop(): Order | null {
    // clear and reset timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // store current order
    const order = this.currentOrder;

    if (order) {
      log(`Bot #${this.id} stopped processing ${order.toString()}`);
    }

    // reset current order
    this.currentOrder = null;

    return order;
  }

  destroy(): Order | null {
    Bot.destroyedCount++;
    return this.stop();
  }
}
