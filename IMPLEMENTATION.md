# Implementation Documentation

## Tech Stack
- **Language:** TypeScript (Node.js)
- **Testing:** Jest
- **Runtime:** ts-node

## Architecture

```
src/
├── index.ts              # CLI entry point (demo)
├── types.ts              # Enums: OrderType, OrderStatus, OrderPriority
├── models/
│   ├── order.ts          # Order class (status, priority)
│   └── bot.ts            # Bot class (process, stop, destroy)
├── services/
│   ├── order-queue.ts    # Priority queue (VIP > Normal)
│   ├── bot-manager.ts    # Bot lifecycle management
│   └── order-controller.ts  # Main controller (facade)
└── utils/
    └── logger.ts         # Timestamp logger (HH:MM:SS)
```

## How to Run

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run demo
npm start

# Or use scripts (for GitHub Actions)
bash scripts/build.sh
bash scripts/test.sh
bash scripts/run.sh   # Output to scripts/result.txt
```

## Design Decisions

1. **Priority Queue** - VIP orders inserted before Normal orders using `findIndex`
2. **10-second Timer** - Each bot uses `setTimeout(10000)` to simulate cooking
3. **LIFO Bot Removal** - Newest bot removed first via `Array.pop()`
4. **Order Requeue** - When bot is destroyed, its order resets to PENDING and returns to queue
