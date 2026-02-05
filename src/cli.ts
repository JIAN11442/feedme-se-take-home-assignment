import * as readline from "readline";
import { OrderController } from "./services/order-controller";
import { OrderType } from "./types";
import { logger, log } from "./utils/logger";

// CLI mode: logs only go to file (use: tail -f output.log)
logger.setOutput("file");

const controller = new OrderController();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log("\n=== McDonald's Order Management System ===");
  console.log("1 - Create Normal Order");
  console.log("2 - Create VIP Order");
  console.log("3 - Add Bot");
  console.log("4 - Remove Bot");
  console.log("5 - Show Status");
  console.log("0 - Exit");
  console.log("");
}

function showStatus(): void {
  const stats = controller.getStats();
  console.log("\n--- Current Status ---");
  console.log(`Orders: ${stats.completedCount}/${stats.totalOrders} completed`);
  console.log(`  - VIP: ${stats.countByType[OrderType.VIP]}`);
  console.log(`  - Normal: ${stats.countByType[OrderType.NORMAL]}`);
  console.log(`Pending: ${stats.pendingOrders}`);
  console.log(`Active Bots: ${stats.activeBots}`);
  console.log(`Destroyed Bots: ${stats.destroyedBots}`);
}

function handleInput(choice: string): boolean {
  switch (choice.trim()) {
    case "1":
      controller.addOrder(OrderType.NORMAL);
      break;
    case "2":
      controller.addOrder(OrderType.VIP);
      break;
    case "3":
      controller.addBot();
      break;
    case "4":
      const removed = controller.removeBot();
      if (!removed) {
        console.log("No bots to remove");
      }
      break;
    case "5":
      showStatus();
      break;
    case "0":
      console.log("\nFinal Status:");
      showStatus();
      console.log("\nGoodbye!");
      return false;
    case "m":
    case "M":
      showMenu();
      break;
    default:
      console.log("Invalid choice. Enter 'm' for menu.");
  }
  return true;
}

function prompt(): void {
  rl.question("> ", (answer) => {
    const continueLoop = handleInput(answer);
    if (continueLoop) {
      prompt();
    } else {
      rl.close();
    }
  });
}

// Start
console.log("=== McDonald's Order Management System ===");
log("System initialized");
showMenu();
console.log("(Enter 'm' to show menu again)\n");
prompt();
