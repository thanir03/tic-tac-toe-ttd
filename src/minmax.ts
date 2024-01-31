import { PossibleSelection, TicTacToeBoard } from "./types";

const isFullBoard = (board: TicTacToeBoard) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") return false;
  }
  return true;
};
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const hasWon = (board: TicTacToeBoard): PossibleSelection => {
  for (const [x, y, z] of winningPosition) {
    if (board[x] === board[y] && board[y] === board[z] && board[x] != "") {
      return board[x];
    }
  }
  return "";
};

const isTerminalBoard = (board: TicTacToeBoard): [boolean, number] => {
  let reward = 0;
  const isFull = isFullBoard(board);
  const winner = hasWon(board);
  if (isFull) reward = 0;
  if (winner === "X") reward = 1;
  else if (winner === "O") reward = -1;
  return [isFull || winner != "", reward];
};

// Using min max algorithm
// return a position number
// Min and Max agents trying to compete each other to achieve the optimal result
export const predictMove = (
  board: TicTacToeBoard,
  player: "Min" | "Max" = "Max"
): [number, number] => {
  const [isTerminated, reward] = isTerminalBoard(board);
  if (isTerminated) return [reward, 0];

  if (player === "Max") {
    // Maximum reward value
    let optimalMove = 0;
    let value = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] != "") continue;
      board[i] = "X";
      const [predictedValue] = predictMove(board, "Min");
      if (predictedValue > value) {
        optimalMove = i;
        value = predictedValue;
      }
      board[i] = "";
    }
    return [value, optimalMove];
  }
  if (player === "Min") {
    // Minimum reward value
    let value = Infinity;
    let optimalMove = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] != "") continue;
      board[i] = "O";
      const [predictedValue] = predictMove(board, "Max");
      if (predictedValue < value) {
        optimalMove = i;
        value = predictedValue;
      }
      board[i] = "";
    }
    return [value, optimalMove];
  }
  return [reward, 0]; // guaranteed to not execute
};
