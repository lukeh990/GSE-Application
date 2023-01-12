import figlet = require("figlet");
import chalk = require("chalk");

const stdin = process.stdin;

const lines = figlet
  .textSync("Luke Harding's\nGSE Application", "Big")
  .split("\n");

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function printHeader() {
  for (const index in lines) {
    const line = lines[index];
    line.trim();
    const chars = Array.from(line);
    for (const _index in chars) {
      const char = chars[_index];
      process.stdout.write(chalk.green.bold(char));
      if (char === " ") continue;
      await timer(20);
    }
    process.stdout.write("\n");
    await timer(700);
  }
}

async function start() {
  await printHeader();
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", (key: string) => {
    if (key === "\u0003") process.exit(1)
    console.log(key);
  });
}

start();
