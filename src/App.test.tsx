import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(() => cleanup());

describe('Ultimate Tic-Tac-Toe UI', () => {
  it('renders the first playable board and rules', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Ultimate Tic-Tac-Toe' })).toBeInTheDocument();
    expect(screen.getByText(/X starts/i)).toBeInTheDocument();
    expect(screen.getByText(/Play in a cell to send your opponent/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Board \d cell \d/ })).toHaveLength(81);
  });

  it('plays a legal move and sends the next player to the matching board', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Board 5 cell 1' }));
    expect(screen.getByRole('status')).toHaveTextContent('O to move. Play board 1.');
    expect(screen.getByRole('button', { name: 'Board 2 cell 1' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Board 1 cell 1' })).toBeEnabled();
  });

  it('resets the game', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Board 5 cell 1' }));
    await user.click(screen.getByRole('button', { name: 'Reset game' }));
    expect(screen.getByRole('status')).toHaveTextContent('X starts. Play anywhere.');
    expect(screen.getByRole('button', { name: 'Board 5 cell 1' })).toBeEnabled();
  });
});
