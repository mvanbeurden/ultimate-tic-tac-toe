import { useState } from 'react';
import { createInitialState, getLegalBoards, playMove, resetGame } from './game/engine';
import { LargeBoard } from './components/LargeBoard';

export function App() {
  const [game, setGame] = useState(createInitialState);
  const [notice, setNotice] = useState('');
  const legalBoards = getLegalBoards(game);

  function onCellClick(boardIndex: number, cellIndex: number) {
    const result = playMove(game, boardIndex, cellIndex);
    if (result.accepted) {
      setGame(result.state);
      setNotice('');
    } else {
      setNotice('That move is not allowed. Use a highlighted board and an empty cell.');
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">First playable concept</p>
        <h1>Ultimate Tic-Tac-Toe</h1>
        <p className="status" role="status">{game.message}</p>
        {notice && <p className="notice">{notice}</p>}
      </section>

      <LargeBoard game={game} legalBoards={legalBoards} onCellClick={onCellClick} />

      <section className="panel">
        <button onClick={() => setGame(resetGame(game))}>Reset game</button>
        <div>
          <h2>Rules</h2>
          <p>Play in a cell to send your opponent to the matching large-board position. Win small boards to claim spaces on the large board. If that board is already won or full, they may play anywhere unfinished.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
