import * as fs from "fs";

type LogOutput = "console" | "file" | "both";

const LOG_FILE = "output.log";

class Logger {
  private output: LogOutput = "both";

  constructor() {
    // Clear log file on start
    fs.writeFileSync(LOG_FILE, "");
  }

  setOutput(output: LogOutput): void {
    this.output = output;
  }

  log(msg: string): void {
    const timestamp = new Date().toTimeString().slice(0, 8);
    const line = `[${timestamp}] ${msg}`;

    if (this.output === "console" || this.output === "both") {
      console.log(line);
    }

    if (this.output === "file" || this.output === "both") {
      fs.appendFileSync(LOG_FILE, line + "\n");
    }
  }
}

// Singleton instance
export const logger = new Logger();

// Shorthand function (保持向後相容)
export function log(msg: string): void {
  logger.log(msg);
}
