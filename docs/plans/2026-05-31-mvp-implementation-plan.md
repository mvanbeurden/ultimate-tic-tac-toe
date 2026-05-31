# Ultimate Tic-Tac-Toe MVP Implementation Plan

> For Hermes: Use TDD and Software Development Team process. First playable only; no backend, AI, accounts, or online multiplayer.

Goal: Build a small web MVP for local two-player Ultimate Tic-Tac-Toe.

Architecture: Vite + React + TypeScript app with pure game logic isolated in src/game/engine.ts. UI components render state and dispatch attempted moves. Unit tests cover rule correctness; browser smoke verifies playability.

Tech Stack: TypeScript, React, Vite, Vitest, Testing Library where needed.

---

Task 1: Create project skeleton and test tooling
Objective: Add package/config files for a minimal Vite React TypeScript app.
Files: package.json, index.html, tsconfig.json, tsconfig.node.json, vite.config.ts, src/test/setup.ts.
Verification: npm install; npm test should run and initially report no tests or pass after setup.

Task 2: Define game types and first failing engine tests
Objective: Specify game state, marks, board results, and move behavior via tests before engine code.
Files: src/game/types.ts, src/game/engine.test.ts.
Verification: npm test fails because engine exports are missing.

Task 3: Implement game engine
Objective: Implement initial state, legal moves, small-board wins/draws, large-board wins/draws, illegal move rejection, and reset-compatible pure state creation.
Files: src/game/engine.ts, src/game/types.ts.
Verification: npm test passes.

Task 4: Build React board UI
Objective: Render large board, small boards, status text, legal-board highlighting, won/drawn board states, rules, and reset.
Files: src/main.tsx, src/App.tsx, src/components/LargeBoard.tsx, src/components/SmallBoard.tsx, src/styles.css.
Verification: npm run build passes.

Task 5: Add UI smoke tests
Objective: Verify initial render, legal move flow, illegal move protection, and reset behavior at UI level.
Files: src/App.test.tsx, src/test/setup.ts.
Verification: npm test passes.

Task 6: Final verification and GitHub persistence
Objective: Run full tests/build, inspect git diff, commit MVP, and push to GitHub.
Files: all changed files.
Verification: npm test, npm run build, git status clean after push.
