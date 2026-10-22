import Player from './components/player/Player';
import GameBoard from './components/gameboard/GameBoard';
import { useState } from 'react';
import Log from './components/logs/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/gameover/GameOver';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(prevTurns) {
  let activePlayer = 'X';
  if (prevTurns.length > 0 && prevTurns[0].player) {
    activePlayer = prevTurns[0].player === 'X' ? 'O' : 'X';
  }
  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  let currentPlayer = deriveActivePlayer(gameTurns);

  let board = initialBoard.map((row) => [...row]);

  let winner = null;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    let firstCell = board[combination[0].row][combination[0].column];
    let secondCell = board[combination[1].row][combination[1].column];
    let thirdCell = board[combination[2].row][combination[2].column];

    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      winner = players[firstCell];
    }
  }

  function handlePlayerChange(rowIndex, cellIndex) {
    setGameTurns((prevTurns) => {
      return [
        {
          square: { row: rowIndex, col: cellIndex },
          player: deriveActivePlayer(prevTurns),
        },
        ...prevTurns,
      ];
    });
  }

  let hasDraw = !winner && gameTurns.length === 9;

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: name,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={currentPlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={currentPlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            hasDraw={hasDraw}
            onRestart={handleRestart}
          />
        )}
        <GameBoard onSelectSquare={handlePlayerChange} board={board} />
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
