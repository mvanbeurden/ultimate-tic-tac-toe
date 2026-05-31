# Ultimate Tic-Tac-Toe: Lightweight Concept Plan

Status: discovery draft, pre-code
Owner: Software Development Team
Target platform: web
First release goal: small playable concept test

## 1. Product discovery summary

### Game concept
Ultimate Tic-Tac-Toe, also described as tic-tac-toe squared: a 3x3 grid of smaller 3x3 tic-tac-toe boards. A move in one small cell sends the next player to the corresponding larger board. Winning small boards contributes to winning the large board.

### Core player promise
A familiar game becomes more strategic without becoming hard to understand: quick matches, visible consequences, and a satisfying “send your opponent somewhere awkward” mechanic.

### Target player for first playable
People who already understand classic tic-tac-toe and can learn one extra rule in under one minute.

### First playable hypothesis
If the web version clearly shows where a player is allowed to play next, two players on the same device can complete a match without instructions after one short rules prompt.

### Primary learning goal
Test whether the rules, board state, and turn restrictions are understandable and fun before investing in polish, AI, accounts, networking, animations, or mobile packaging.

## 2. Scope for first playable version

### In scope
- Web app playable in a browser.
- Local two-player mode on one device.
- 9 small boards arranged in a 3x3 large board.
- X and O turns.
- Legal-move enforcement.
- Highlight active board where the next player must move.
- If the required board is already won or full, allow play on any unfinished board.
- Detect small-board wins and draws.
- Detect large-board win and overall draw.
- Reset game button.
- Short rules/help panel.
- Simple responsive layout for desktop and tablet-sized browser windows.

### Out of scope for first playable
- Online multiplayer.
- Computer opponent / AI.
- User accounts.
- Match history.
- Rankings or scoring beyond current match result.
- Save/resume.
- Sound, heavy animation, themes, skins.
- Complex tutorial flow.
- Mobile app store packaging.

## 3. Rules definition for MVP

1. The large board contains 9 small tic-tac-toe boards.
2. Player X starts.
3. On a turn, the player marks one empty cell on a legal small board.
4. The cell position chosen determines the small board where the next player must play.
5. Example: if X plays the top-right cell of any small board, O must play in the top-right small board next.
6. If the destination small board is already won or full, the next player may play in any unfinished small board.
7. A small board is won with 3 matching marks in a row, column, or diagonal.
8. A drawn small board counts as unavailable but does not count for either player on the large board.
9. The large board is won when a player wins 3 small boards in a row, column, or diagonal.
10. The full game is a draw if all small boards are won or drawn and no large-board winner exists.

Open rule decision: Whether a player may play in an already won board if sent there. Proposed MVP answer: no; won or full boards are unavailable, so the player may play anywhere unfinished.

## 4. User experience concept

### Screen layout
- Top: game title, current turn, and game result area.
- Center: large 3x3 board, each section containing a small 3x3 board.
- Active legal boards get a strong visual outline.
- Inactive boards are dimmed but still readable.
- Won small boards show a large X or O overlay, while preserving enough cell history to understand how it happened.
- Drawn small boards show a neutral draw indicator.
- Bottom or side: reset button and concise rules.

### Critical UX requirement
The player should never need to infer legal moves by reading the rules. The UI must make legal boards obvious and must reject illegal clicks with a small visual cue or status message.

## 5. Success criteria for the first playable

A first playable is successful if:
- A complete local two-player game can be played from start to finish.
- Illegal moves cannot alter game state.
- Current player and legal board(s) are always visible.
- Small-board and large-board wins are detected correctly.
- Reset returns to a clean initial state.
- A new player can understand the game loop from the visible help text.
- The implementation remains simple enough to rewrite/refactor after concept testing.

## 6. Acceptance tests, written as product behavior

- Starting state: X to move, all 9 small boards legal.
- After X plays cell index 0 in any board, O is sent to large board index 0 if it is unfinished.
- If the destination board is won or full, the next player may play any unfinished board.
- A player who wins a small board claims that position on the large board.
- A player who claims three small boards in a large-board row wins the game.
- Clicking an occupied cell does nothing and leaves the current player unchanged.
- Clicking a cell in an illegal board does nothing and leaves the current player unchanged.
- After game over, clicks do not alter the board until reset.
- Reset clears all marks, board results, active-board restriction, and game result.

## 7. Suggested technical approach for small web MVP

### Recommended stack
Use a minimal browser-first stack: TypeScript, Vite, and React, with game logic isolated from UI. If the repo is intended to be even smaller, plain TypeScript plus DOM rendering is acceptable, but React will make board rendering and state updates straightforward.

### Architecture
- Pure game engine module for rules and state transitions.
- UI components render state and dispatch attempted moves.
- Tests focus heavily on the engine, because rules correctness is the core risk.
- No backend for first playable.

### Proposed file structure
- package.json
- index.html
- src/main.tsx
- src/App.tsx
- src/game/types.ts
- src/game/engine.ts
- src/game/engine.test.ts
- src/components/LargeBoard.tsx
- src/components/SmallBoard.tsx
- src/styles.css
- docs/product/2026-05-31-concept-plan.md

## 8. Product risks and mitigations

Risk: Players get confused about where they can play.
Mitigation: Active-board highlighting, status text, and illegal-click feedback are MVP requirements.

Risk: Rule edge cases create bugs.
Mitigation: Build pure game logic first with unit tests before UI wiring.

Risk: Scope expands into online multiplayer too early.
Mitigation: Explicitly keep first playable local-only; validate fun before networking.

Risk: The UI becomes too visually noisy.
Mitigation: Use a simple board with clear active/inactive/won states; avoid decorative polish in MVP.

## 9. Lightweight implementation phases after approval

Phase 1: Create small web project skeleton and test setup.
Phase 2: Implement pure game state model and rule tests.
Phase 3: Build board UI and connect legal move dispatch.
Phase 4: Add result display, reset, and rules/help text.
Phase 5: Run browser smoke test and capture first-playable feedback notes.

## 10. Decisions needed before code

Recommended defaults are included so implementation can proceed without a long requirements cycle.

Decision A: Local-only first playable?
Recommended: yes.

Decision B: Use React + TypeScript + Vite?
Recommended: yes.

Decision C: Disallow moves in won boards when sent there?
Recommended: yes; treat won/full destination boards as “play anywhere unfinished.”

Decision D: Visual style?
Recommended: clean monochrome board with one accent color for active legal boards.

Decision E: Repository location?
Approved: create a new project at /root/projects/ultimate-tic-tac-toe rather than mixing it into the Hermes Agent repository.

Decision F: GitHub persistence?
Approved: save code and product documentation in a dedicated GitHub repository from the start. Use GitHub as the durable source of truth for project history.

## 11. Software Development Team routing

Product Manager: validate hypothesis, scope, acceptance criteria, and post-playtest feedback questions.
Technical Lead: own architecture, rule model, tests, and build verification.
Builder: implement only after concept approval.
Reviewer: check rule correctness, edge cases, UI clarity, and scope discipline.
QA: run local browser smoke test and rule-path checks.
KM Agent: keep product docs in the game repo, not in Hermes operating doctrine.

## 12. Recommended next step

Confirm or revise the five decisions above. Once approved, produce a bite-sized implementation plan with exact tasks and tests before writing any code.
