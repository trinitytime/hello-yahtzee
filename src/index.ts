import { Command } from "commander"
import { run } from "./game"

const program = new Command()

program
  .name('Yahtzee')
  .description('Yahtzee for node.js')
  .action(async () => await run())

program.parse(process.argv)