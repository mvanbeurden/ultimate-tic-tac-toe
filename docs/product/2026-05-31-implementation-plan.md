# Ultimate Tic-Tac-Toe First Playable Implementation Plan

Status: approved for first playable
Goal: create a small local two-player web version and publish a test link.

## Stack
- Vite
- React
- TypeScript
- Vitest
- GitHub Pages

## Task 1: Project skeleton
Create package.json, Vite config, TypeScript configs, index.html, src entry files, and CSS.
Verification: npm install, npm run build.

## Task 2: Game engine with TDD
Create src/game/engine.ts and src/game/engine.test.ts.
Required behavior tests:
- initial state has X to move and all boards legal
- a move sends the next player to the matching board
- occupied cells and illegal boards are rejected without changing turn
- small board wins are detected
- won/full destination boards allow any unfinished board
- large board wins are detected
- reset returns to initial state
Verification: npm test -- --run.

## Task 3: UI components
Create App, LargeBoard, and SmallBoard rendering components.
UI requirements:
- current player and status visible
- active legal boards highlighted
- inactive boards dimmed
- won boards show a large winner mark
- reset button works
- concise rules visible
Verification: npm run build and browser smoke test.

## Task 4: GitHub Pages deployment
Add GitHub Actions workflow to build and deploy static site from main.
Set Vite base to /ultimate-tic-tac-toe/.
Push to GitHub and enable Pages via workflow if needed.
Verification: GitHub Pages URL loads the game.

## Acceptance
The final test link should allow a user to play a complete local two-player Ultimate Tic-Tac-Toe game from start to finish in a browser.
