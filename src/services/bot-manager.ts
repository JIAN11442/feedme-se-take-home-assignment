import { Bot } from "../models/bot";
import { OrderQueue } from "./order-queue";
import { log } from "../utils/logger";

export class BotManager {
  private bots: Bot[] = [];
  private nextBotId: number = 1;

  constructor(private queue: OrderQueue) {}

  get activeBotCount(): number {
    return this.bots.length;
  }

  addBot(): Bot {
    const bot = new Bot(this.nextBotId++, () => {
      this.dispatchNextOrderAndProcess(bot);
    });

    log(`Bot #${bot.id} created - Status: ACTIVE`);

    this.bots.push(bot);
    this.dispatchNextOrderAndProcess(bot);

    return bot;
  }

  removeBot(): Bot | null {
    if (this.bots.length === 0) return null;

    const bot = this.bots.pop()!;
    const order = bot.destroy();

    if (order) {
      this.queue.requeue(order);
    }

    log(`Bot #${bot.id} destroyed`);
    return bot;
  }

  dispatchNextOrderAndProcess(checkBot?: Bot): void {
    for (const bot of this.bots) {
      // find an available bot
      if (bot.isIdle) {
        // get next pending order
        const order = this.queue.next();
        // if has next pending order, process it (10 seconds)
        if (order) {
          bot.process(order);
        }
      }
    }

    if (checkBot && checkBot.isIdle) {
      log(`Bot #${checkBot.id} is now IDLE - No pending orders`);
    }
  }
}
