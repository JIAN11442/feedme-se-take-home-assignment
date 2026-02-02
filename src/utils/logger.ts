export function log(msg: string): void {
  const now = new Date();
  const timestamp = now.toTimeString().slice(0, 8);

  console.log(`[${timestamp}] ${msg}`);
}
