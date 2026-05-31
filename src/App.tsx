import { useMemo, useState } from 'react';
import LargeBoard from './components/LargeBoard';
import { createInitialState, getLegalBoardIndexes, playMove } from './game/engine';

export default function App() {
  const [state, setState] = useState(createInitialState);
  const legalBoards = useMemo(() => getLegalBoardIndexes(state), [state]);

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">First playable MVP</p>
        <h1>Ultimate Tic-Tac-Toe</h1>
        <p className="status" role="status">{state.message}</p>
      </header>

      <LargeBoard
        state={state}
        legalBoards={legalBoards}
        onMove={(boardIndex, cellIndex) => setState((current) => playMove(current, { boardIndex, cellIndex }))}
      />

      <section className="controls">
        <button className="reset" onClick={() => setState(createInitialState())}>Reset game</button>
        <div className="rules">
          <h2>Rules</h2>
          <p>Play in a cell to send your opponent to the matching large board. Win small boards to claim the big board. If the target board is finished, play anywhere unfinished.</p>
        </div>
      </section>
    </main>
  );
}
