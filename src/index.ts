import figlet = require("figlet");
import chalk = require("chalk");
import { once } from "events";

const stdin = process.stdin;
const stdout = process.stdout;

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
    await timer(600);
  }
}

async function detectEnterKey() {
  stdout.write("Press ENTER to continue\n");
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  while (true) {
    const key: string = (await once(stdin, "data"))[0];
    if (key === "\r") break;
    if (key === "\u0003") process.exit(1);
  }
  stdin.setRawMode(false);
}

async function start() {
  await printHeader();
  await detectEnterKey();
}

start();
