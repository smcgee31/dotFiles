interface Year {
  min: number;
  max: number;
}

interface Team {
  completedRounds: number;
  score: number;
}

// type TeamKey = `team${number}`;  <-- this would be for something like line

export interface GameState {
  rounds: number;
  currentRound: number;
  roundTime: number;
  age: string;
  year: Year;
  categories: string[];
  // [key: TeamKey]: Team;      <-- but this isn't a good way
  teams: Record<string, Team>;
}

declare const myGameState: GameState;
myGameState['teem'];
const myTeam = myGameState['teem1'];

const myKey: TeamKey = 'team200a';

const initialGameState: GameState = {
  rounds: 3,
  currentRound: 0,
  roundTime: 30,
  age: '',
  year: {
    min: 1990,
    max: 2000,
  },
  categories: [],
  teams: {},
};

const gameState: GameState = {
  rounds: 3,
  currentRound: 0,
  roundTime: 30,
  age: '',
  year: {
    min: 1990,
    max: 2000,
  },
  categories: [],
  teams: {
    1: {
      completedRounds: 0,
      score: 0,
    },
    2: {
      completedRounds: 0,
      score: 0,
    },
    3: {
      completedRounds: 0,
      score: 0,
    },
  },
};
