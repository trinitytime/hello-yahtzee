import inquirer from 'inquirer'
import checkbox from '@inquirer/checkbox'
import { select } from "inquirer-select-pro"
import { state } from './state'

export async function askName() {
  const answers = await inquirer.prompt({
    name: 'playerName',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player1'
    }
  })
  state.player = answers.playerName
}

export async function askDice() {
  return await checkbox({
    message: 'Please choose the dice to roll again.',
    choices: [ 
      { name: state.dice[0].toString(), value: 0 },
      { name: state.dice[1].toString(), value: 1 },
      { name: state.dice[2].toString(), value: 2 },
      { name: state.dice[3].toString(), value: 3 },
      { name: state.dice[4].toString(), value: 4 },
    ]
  })
}

export async function askScore() {
  return await select({
    message: 'Please select the score category to apply.',
    required: true,
    multiple: false,
    options: [
      { name: 'Aces', value: 1 },
      { name: 'Tows', value: 2 },
      { name: 'Threes', value: 3 },
      { name: 'Fours', value: 4 },
      { name: 'Fives', value: 5 },
      { name: 'Sixes', value: 6 },
      { name: 'Three of a kind', value: 7 },
      { name: 'Four of a kind', value: 8 },
      { name: 'Full House', value: 9 },
      { name: 'Small Straight', value: 10 },
      { name: 'Large Straight', value: 11 },
      { name: 'Chance', value: 12 },
      { name: 'Yahtzee', value: 13 },
    ]
  })
}