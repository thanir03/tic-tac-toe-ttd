import { useEffect, useState } from "react";
import clsx from "clsx";
import { Move, Opponent, PossibleSelection, TicTacToeBoard } from "../types";
import { predictMove } from "../minmax";

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

const initialBoard: TicTacToeBoard = ["", "", "", "", "", "", "", "", ""];

const hasWon = (board: TicTacToeBoard): PossibleSelection => {
  for (const [x, y, z] of winningPosition) {
    if (board[x] === board[y] && board[y] === board[z] && board[x] != "") {
      return board[x];
    }
  }
  return "";
};

const isFullBoard = (board: TicTacToeBoard) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") return false;
  }
  return true;
};

interface IBoardProps {
  opponentType: Opponent;
  onResetGame: () => void;
  playerType: Move;
}

const Board = function (props: IBoardProps) {
  const [board, setBoard] = useState<TicTacToeBoard>(initialBoard);
  const [turn, setTurn] = useState<Move>("O");
  const [winner, setWinner] = useState<PossibleSelection>("");
  const isFull = isFullBoard(board);
  const isMatchEnd = isFull || winner != "";

  const handleSelectPosition = (player: Move, position: number) => {
    if (position < 0 || position > 8) return;
    if (isFull) {
      return;
    }
    if (winner !== "") {
      return;
    }

    if (board[position] !== "") {
      return;
    }

    const newBoard = [...board];
    newBoard[position] = player;
    setBoard(newBoard);

    setTurn((turn) => {
      return turn === "X" ? "O" : "X";
    });
  };

  useEffect(() => {
    const playerWon = hasWon(board);
    if (playerWon != "") {
      setWinner(playerWon);
    }
  }, [board]);

  useEffect(() => {
    if (turn != props.playerType && props.opponentType === "computer") {
      const [, move] = predictMove(board, "Max");
      const newBoard = [...board];
      newBoard[move] = props.playerType === "X" ? "O" : "X";
      setBoard(newBoard);
      const nextTurn = turn === "X" ? "O" : "X";
      setTurn(nextTurn);
    }
  }, [turn, props.playerType, board, props.opponentType]);

  const handleResetBoard = () => {
    setBoard(initialBoard);
    setTurn("O");
    setWinner("");
  };

  return (
    <>
      {!isMatchEnd && <p className="text-xl">Player {turn}'s turn</p>}
      <div className="grid grid-cols-3">
        {board.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "cursor-pointer flex items-center justify-center border-4 border-white w-20 h-20 text-4xl font-game",
              {
                "border-r-0": index === 2 || index === 5 || index === 8,
                "border-l-0": index === 0 || index === 3 || index === 6,
                "border-t-0": index === 0 || index === 1 || index === 2,
                "border-b-0": index === 6 || index === 7 || index === 8,
              }
            )}
            onClick={() => handleSelectPosition(turn, index)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner != "" && <h1>{`Player ${winner} has won`}</h1>}
      {isFull && winner === "" && <h1>Draw Match</h1>}
      <button
        onClick={() => {
          handleResetBoard();
          props.onResetGame();
        }}
      >
        Replay
      </button>
    </>
  );
};
export default Board;
