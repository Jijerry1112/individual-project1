# Individual Project 1 - Blackjack Lite Layout

Rebuild (lite) of The Washington Post Blackjack UI layout in React.

---

## Original Website

The original reference site:  
https://games.washingtonpost.com/games/blackjack

This project recreates the core layout and gameplay logic of the Washington Post Blackjack interface using React.

---

## Scope of Recreation

This project focuses on rebuilding the core Blackjack experience, including:

- Player and Dealer hands
- Deal / Hit / Stand interactions
- Score calculation
- Ace handling (1 or 11 logic)
- Bust detection
- Win / Lose / Push conditions
- Bankroll tracking
- Settings modal interface

The goal was to recreate the gameplay logic and layout structure rather than replicate every visual detail.

---

## Features Implemented

- Interactive **Deal** button to start a new round
- **Hit** functionality (adds card to player hand)
- **Stand** functionality (dealer auto-draw logic)
- Automatic score calculation
- Dynamic Ace value handling
- Bust detection
- Result display (Win / Lose / Push)

Additional features added beyond the base layout:

- Bankroll system with betting
- **High score tracking**
- **Records leaderboard (Top scores)**
- Settings modal with configurable options
- Language switching (English / Chinese)
- Responsive layout and UI polish
- Card dealing animation

---

## Technical Implementation

### State Management

Game state is managed using React’s `useState` hook.

Key state includes:

- Player hand
- Dealer hand
- Deck of cards
- Game phase
- Bankroll amount
- Round result message
- Records / high score

State updates trigger re-renders to reflect gameplay changes in real time.

---

### Context Usage

The project uses React Context to manage shared configuration settings across components (such as language selection), helping avoid excessive prop drilling.

---

### Hooks Used

- `useState` – manage dynamic game state
- `useEffect` – handle dealer drawing logic and round transitions
- `useContext` – access shared settings
- `useMemo` – optimize language text selection

---

## Routing

This project is implemented as a single-page application and does not use multiple routes.

---

## Live Site & Repository

Live Site (GitHub Pages):  
https://jijerry1112.github.io/individual-project1/

Repository:  
https://github.com/Jijerry1112/individual-project1
---

## Future Improvements

If continued, I would improve:

- Split hand support
- Insurance gameplay logic
- Sound effects
- Improved card animations
- More advanced strategy hints