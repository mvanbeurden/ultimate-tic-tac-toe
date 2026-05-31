export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardResult = { winner: Player } | { draw: true } | null;

export interface SmallBoard {
  cells: Cell[];
  result: BoardResult;
}

export interface GameResultWinner {
  winner: Player;
}

export interface GameResultDraw {
  draw: true;
}

export type GameResult = GameResultWinner | GameResultDraw | null;

export interface Move {
  boardIndex: number;
  cellIndex: number;
}

export interface GameState {
  boards: SmallBoard[];
  currentPlayer: Player;
  nextBoardIndex: number | null;
  gameResult: GameResult;
  message: string;
}
