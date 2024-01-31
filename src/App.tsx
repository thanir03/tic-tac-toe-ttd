import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { Move, Opponent } from "./types";
import clsx from "clsx";

const opponents: Opponent[] = ["human", "computer"];

function App() {
  const [playerType, setPlayerType] = useState<Move | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(
    null
  );
  const isValidGameSelection = playerType != null && selectedOpponent != null;
  const handleChangeOpponent = (opponent: Opponent) => {
    setSelectedOpponent(opponent);
  };
  const handleChangePlayer = (player: Move) => {
    setPlayerType(player);
  };

  const resetGame = () => {
    setPlayerType(null);
    setSelectedOpponent(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 ">
      <h1 className="font-mono">Tic tac toe</h1>

      {!isValidGameSelection && (
        <>
          <div className="">
            <p>Select Opponent Type</p>
            <div className="flex gap-3 px-5 mt-5 ">
              {opponents.map((item) => (
                <button
                  key={item}
                  className={clsx("focus:outline-none focus:border-none", {
                    "bg-yellow-400": selectedOpponent === item,
                    "text-black": selectedOpponent === item,
                  })}
                  onClick={() => handleChangeOpponent(item)}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p>Select Player type</p>
            <div className="flex gap-3 px-5 mt-5">
              <button
                className={clsx("focus:outline-none focus:border-none", {
                  "bg-yellow-400": playerType === "O",
                  "text-black": playerType === "O",
                })}
                onClick={() => handleChangePlayer("O")}
              >
                O
              </button>
              <button
                className={clsx("focus:outline-none focus:border-none", {
                  "bg-yellow-400": playerType === "X",
                  "text-black": playerType === "X",
                })}
                onClick={() => handleChangePlayer("X")}
              >
                X
              </button>
            </div>
          </div>
        </>
      )}
      {isValidGameSelection && (
        <Board
          onResetGame={resetGame}
          opponentType={selectedOpponent}
          playerType={playerType}
        />
      )}
    </div>
  );
}

export default App;
