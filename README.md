# Individual Project 1 - Blackjack Lite Layout

Rebuild (lite) of The Washington Post Blackjack UI layout in React.

<<<<<<< HEAD
## Original
https://games.washingtonpost.com/games/blackjack

## Run locally
npm install
npm run dev

## Progress Update

In this checkpoint, I implemented interactive Blackjack gameplay using React state and event handlers. The player and dealer hands are stored in state, and actions such as Deal, Hit, and Stand update the state and trigger re-renders. I also implemented a controlled Settings modal using checkbox inputs managed by React state. These interactions support the project goal of building a playable Blackjack interface. Next, I plan to improve scoring logic (Ace handling), implement dealer drawing behavior, and add win/lose conditions.
=======
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

- Interactive Deal button to start a new round
- Hit functionality (adds card to player hand)
- Stand functionality (dealer auto-draw logic)
- Automatic score calculation
- Dynamic Ace value handling
- Bust detection
- Result display (Win / Lose / Push)
- Bankroll system
- Controlled Settings modal (React-managed checkboxes)
- Responsive layout structure

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

State updates trigger re-renders to reflect gameplay changes in real time.

---

### Context Usage

The project uses React Context (`ModeContext`) to manage shared configuration settings across components and avoid excessive prop drilling.

---

### Hooks Used

- `useState` – manage dynamic game state
- `useEffect` – handle dealer drawing logic and round transitions
- `useContext` – access global settings

---

## Routing

This project is implemented as a single-page application and does not use multiple routes.

---

## Live Site & Repository

Live Site (GitHub Pages):  
👉 [PASTE YOUR GITHUB PAGES LINK HERE]

Repository:  
👉 [PASTE YOUR REPO LINK HERE]

---

## Future Improvements

If continued, I would improve:

- Card dealing animations
- UI polish and spacing refinement
- Sound effects
- Multi-deck shoe logic
- Persistent bankroll using localStorage
>>>>>>> 99f5183 (Readme Update)
