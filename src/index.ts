import figlet = require("figlet");
import chalk = require("chalk");
import progress = require("cli-progress");
import { once } from "events";
import { randomInt } from "crypto";

const stdin = process.stdin;
const stdout = process.stdout;

// Split the figlet text into each line
const lines = figlet
  .textSync("Luke Harding's\nGSE Application", "Big")
  .split("\n");

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function printHeader() {
  for (const index in lines) {
    const line = lines[index];
    line.trim();
    // Break each line into individual characters
    const chars = Array.from(line);
    for (const _index in chars) {
      const char = chars[_index];
      process.stdout.write(chalk.green.bold(char));
      // Skip all spaces
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
    // Exit if ctrl + c is used
    if (key === "\u0003") process.exit(1);
  }
  stdin.setRawMode(false);
}

async function start() {
  await printHeader();
  await detectEnterKey();
  const progressBar = new progress.SingleBar(
    { format: chalk.red.bold("Starting Up...  |{bar}| {percentage}%") },
    progress.Presets.shades_classic
  );
  progressBar.start(100, 0);
  // After a random amount of time add a random amount to the progress bar
  while (true) {
    await timer(randomInt(1000));
    const random = randomInt(20);
    if (progressBar.getProgress() * 100 + random >= progressBar.getTotal()) {
      progressBar.update(100);
      break;
    }
    progressBar.increment(randomInt(20));
  }
  progressBar.stop();
  // Window will not close if you don't exit
  process.exit(0);
}

start();
