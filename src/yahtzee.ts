import { state } from "./state"

function getRandNumber(){
  // random number between 1 and 6
  return 1 + Math.floor(Math.random() * 6)
}

function getNumberCnt(){
  let _cnt = [0,0,0,0,0,0]

  for(let i = 1; i <= 6; i++) {
    for(let j = 0; j < state.dice.length; j++) {
      if(state.dice[j] == i) {
        _cnt[i - 1]++
      }
    }
  }
  state.numCnt = _cnt
  return _cnt
}

class Yahtzee {
  start(){
    state.running = true
    state.gameScore = 0
  }

  end() {
    console.clear()
    console.log('Game End')

    console.log(`Game Score: ${state.gameScore}`)
  }

  roll(){
    for(let i = 0; i < state.dice.length; i++) {
      if(state.targetDice[i]) {
        state.dice[i] = getRandNumber()
      }
    }
    state.numCnt = getNumberCnt()
  }

  setTargetDice(num: number[]) {
    state.targetDice = [false,false,false,false,false]
    num.map((item) => {
      state.targetDice[item] = true
    })
  }

  roundReset(){
    state.dice = [0,0,0,0,0]
    state.targetDice = [true, true, true, true, true]
    state.numCnt = [0,0,0,0,0,0]
    state.round++
    state.tryCnt = 0
  }

  roundStart() {
    this.roundReset()
    this.roll()
  }
}

export const yahtzee = new Yahtzee()
