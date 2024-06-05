import  _ from "lodash"
import { state } from "./state"
import { yahtzee } from "./yahtzee"
import { askName, askDice, askScore } from "./inquiry"
import { print, setScore } from "./score"

async function welcome() {
  const gameRule = `
  Game Rules
    A game consists of thirteen rounds. 
    After each round, the player chooses which scoring category is to be used for that round. Once a category has been used in the game, it cannot be used again. 
    The scoring categories have varying point values, some of which are fixed values and others for which the score depends on the value of the dice. 
    A Yahtzee is five-of-a-kind and scores 50 points, the highest of any category. The winner is the player who scores the most points.
  `
  console.clear()
  console.log(gameRule)
  await askName()
}

async function putScore() {
  const score = await askScore()
  if(!_.isNil(score)) {
    if(13 == score && state.score[13].fixed != -1) {
      state.score[13].fixed += 100
      state.gameScore += 100
    } else if(state.score[score].fixed != -1) {
      console.log('already fixed')
      await putScore()
    } else {
      await setScore(score)
    }
  }
  return
}

async function round() {
  yahtzee.roundStart()

  while(state.tryCnt < 2) {
    print()

    const num = await askDice()
    if(_.isEmpty(num)) {
      break
    } else {
      yahtzee.setTargetDice(num)
      yahtzee.roll()
    }
    state.tryCnt++
  }

  print()
  await putScore()
}

async function game(){
  yahtzee.start

  while(state.round < 13)
    await round()

  yahtzee.end()
}

export async function run() {
  await welcome()
  await game()
}