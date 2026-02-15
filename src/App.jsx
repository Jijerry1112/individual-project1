import { useMemo, useState } from "react";
import "./App.css";

import GameTable from "./components/GameTable";
import DealerArea from "./components/DealerArea";
import PlayerArea from "./components/PlayerArea";
import ActionBar from "./components/ActionBar";
import SettingsModal from "./components/SettingsModal";

function drawCard() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return ranks[Math.floor(Math.random() * ranks.length)];
}

function cardValue(rank) {
  if (rank === "A") return 11; 
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  return Number(rank);
}

function handScore(hand) {
  return hand.reduce((sum, r) => sum + cardValue(r), 0);
}

export default function App() {
  const [showSettings, setShowSettings] = useState(false);


  const [settings, setSettings] = useState({
    sound: true,
    soft17: true,
    insurance: false,
    advice: false,
  });


  const [playerHand, setPlayerHand] = useState(["6", "Q"]);
  const [dealerHand, setDealerHand] = useState(["J", "A"]); 
  const [dealerHidden, setDealerHidden] = useState(true);

  const playerScore = useMemo(() => handScore(playerHand), [playerHand]);
  const dealerScore = useMemo(
    () => (dealerHidden ? null : handScore(dealerHand)),
    [dealerHand, dealerHidden]
  );

  const playerBusted = playerScore > 21;

  function handleDeal() {
    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard(), drawCard()]);
    setDealerHidden(true);
  }

  function handleHit() {
    if (playerBusted) return;
    setPlayerHand((prev) => [...prev, drawCard()]);
  }

  function handleStand() {
    setDealerHidden(false);
  }

  return (
    <>
      <GameTable>
        <DealerArea hand={dealerHand} hidden={dealerHidden} score={dealerScore} />
        <PlayerArea hand={playerHand} score={playerScore} />

        <ActionBar
          onHit={handleHit}
          onStand={handleStand}
          onDeal={handleDeal}
          onOpenSettings={() => setShowSettings(true)}
          disableHit={playerBusted}
        />
      </GameTable>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
}
