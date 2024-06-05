import _ from 'lodash'
import chalk from 'chalk'
import { state } from './state'

function getSum(filter?: number): number {
  // Sum of Dice
  let sum = 0
  state.dice.map((item, index) =>{
    sum += (filter ? (state.dice[index] == filter ? state.dice[index] : 0) : state.dice[index])
  })

  return sum
}

function isTriple() {
  // At least three dice the same
  return state.numCnt.indexOf(3) != -1 || isQuads()
}

function isQuads() {
  // At least four dice the same
  return state.numCnt.indexOf(4) != -1 || isYahtzee()
}

function isYahtzee() {
  // All five dice the same
  return state.numCnt.indexOf(5) != -1
}

function isFull() {
  // Three of one number and two of another
  return state.numCnt.indexOf(3) != -1 && state.numCnt.indexOf(2) != -1
}

function isSmallStraight() {
  // Four sequential dice
  // (1-2-3-4, 2-3-4-5, 3-4-5-6)
  return (state.numCnt[0] != 0 && state.numCnt[1] != 0 && state.numCnt[2] != 0 && state.numCnt[3] != 0)
    || (state.numCnt[1] != 0 && state.numCnt[2] != 0 && state.numCnt[3] != 0 && state.numCnt[4] != 0)
    || (state.numCnt[2] != 0 && state.numCnt[3] != 0 && state.numCnt[4] != 0 && state.numCnt[5] != 0)
}

function isLargeStraight(){
  // Five sequential dice
  // (1-2-3-4-5, 2-3-4-5-6)
  return (state.numCnt[0] != 0 && state.numCnt[1] != 0 && state.numCnt[2] != 0 && state.numCnt[3] != 0 && state.numCnt[4] !=0)
    || (state.numCnt[1] != 0 && state.numCnt[2] != 0 && state.numCnt[3] != 0 && state.numCnt[4] != 0 && state.numCnt[5] !=0)
}

function getScore(type: string): number {
  switch(type) {
    case 'Aces': return getSum(1)
    case 'Tows': return getSum(2)
    case 'Threes': return getSum(3)
    case 'Fours': return getSum(4)
    case 'Fives': return getSum(5)
    case 'Sixes': return getSum(6)
    case 'Three of a kind': return isTriple() ? getSum() : 0
    case 'Four of a kind': return isQuads() ? getSum() : 0
    case 'Full House': return isFull() ? 25 : 0
    case 'Small Straight': return isSmallStraight() ? 30 : 0
    case 'Large Straight': return isLargeStraight() ? 40 : 0
    case 'Chance': return getSum()
    case 'Yahtzee': return isYahtzee() ? 50 : 0
    default: return 0
  }
}

function calcScore() {
  state.score[1].temp = getScore('Aces')
  state.score[2].temp = getScore('Tows')
  state.score[3].temp = getScore('Threes')
  state.score[4].temp = getScore('Fours')
  state.score[5].temp = getScore('Fives')
  state.score[6].temp = getScore('Sixes')
  state.score[7].temp = getScore('Three of a kind')
  state.score[8].temp = getScore('Four of a kind')
  state.score[9].temp = getScore('Full House')
  state.score[10].temp = getScore('Small Straight')
  state.score[11].temp = getScore('Large Straight')
  state.score[12].temp = getScore('Chance')
  state.score[13].temp = getScore('Yahtzee')
}

export function printScoreBoard() {
  const s = state.score.map((score) => {
    return score.fixed === -1 ? `${score.temp}`.padStart(3, ' ') : ` ${score.fixed}`.padStart(3, ' ')
  })

  const scoreName = [
    'Bonus',
    'Aces',
    'Tows',
    'Threes',
    'Fours',
    'Fives',
    'Sixes',
    'Three of a kind',
    'Four of a kind',
    'Full House',
    'Small Straight',
    'Large Straight',
    'Chance',
    'Yahtzee',
  ]

  const n = scoreName.map((name, index) => {
    return state.score[index].fixed === -1 ? `${name}`.padStart(3, ' ') : `${chalk.strikethrough(name)}`.padStart(3, ' ')
  })

  const board = `
┌───────────┬─────┬─────────────────────┬─────┐
│ 1. ${n[1]}   │ ${s[1]} |  7. ${n[7]} │ ${s[7]} |
│ 2. ${n[2]}   │ ${s[2]} |  8. ${n[8]}  │ ${s[8]} |
│ 3. ${n[3]} │ ${s[3]} |  9. ${n[9]}      │ ${s[9]} |
│ 4. ${n[4]}  │ ${s[4]} | 10. ${n[10]}  │ ${s[10]} |
│ 5. ${n[5]}  │ ${s[5]} | 11. ${n[11]}  │ ${s[11]} |
│ 6. ${n[6]}  │ ${s[6]} | 12. ${n[12]}          │ ${s[12]} |
│ ${n[0]}     │ ${s[0]} | 13. ${n[13]}         │ ${s[13]} |
└───────────┴─────┴─────────────────────┴─────┘
  `.trim()
  console.log(board)
}

function printDice() {
  const v = state.dice

  const text = `
  ┌───┐┌───┐┌───┐┌───┐┌───┐
  │ ${v[0]} ││ ${v[1]} ││ ${v[2]} ││ ${v[3]} ││ ${v[4]} │
  └───┘└───┘└───┘└───┘└───┘
  `
  console.log(text)
}

export function print() {
  calcScore()

  console.clear()
  console.log(`Welcom ${state.player}`)
  console.log(`Round : ${state.round}`)
  console.log(`Game Score : ${state.gameScore}`)
  printScoreBoard()
  printDice()
}

export async function setScore(index: number) {
  state.score[index].fixed = state.score[index].temp
  state.gameScore += state.score[index].fixed
  const bonus = state.score.slice(1,7).reduce((acc, score) => (0 <= score.fixed ? acc + score.fixed : acc), 0)
  if (63 <= bonus) {
    state.score[0].fixed = 35
  }
}