class State {
  running = false
  player = 'Player1'
  dice = [0,0,0,0,0]
  targetDice = [true,true,true,true,true]
  numCnt = [0,0,0,0,0,0]
  round = 0
  tryCnt = 0
  gameScore = 0
  score = [
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
    { 'fixed': -1, 'temp': 0 },
  ]
}

export const state = new State()
