import { useEffect, useMemo, useState, useContext } from "react";
import "./App.css";

import { LanguageContext } from "./context/LanguageContext";
import en from "./context/en";
import zh from "./context/zh";

import TopBar from "./components/TopBar";
import GameTable from "./components/GameTable";
import DealerArea from "./components/DealerArea";
import PlayerArea from "./components/PlayerArea";
import ActionBar from "./components/ActionBar";
import SettingsModal from "./components/SettingsModal";
import RecordsModal from "./components/RecordsModal";

function drawCard() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return ranks[Math.floor(Math.random() * ranks.length)];
}

function cardValue(rank) {
  if (rank === "A") return 11;
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  return Number(rank);
}

// best total <= 21 if possible
function handInfo(hand) {
  let total = 0;
  let aces = 0;

  for (const r of hand) {
    total += cardValue(r);
    if (r === "A") aces += 1;
  }

  while (total > 21 && aces > 0) {
    total -= 10; // A(11) -> A(1)
    aces -= 1;
  }

  return { total };
}

function runDealerTurn(startHand) {
  const d = [...startHand];
  let info = handInfo(d);

  while (info.total < 17) {
    d.push(drawCard());
    info = handInfo(d);
  }

  return { dealerFinalHand: d, dealerTotal: info.total };
}

export default function App() {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  const INITIAL_BANKROLL = 100;
  const baseBet = 10;

  const [showSettings, setShowSettings] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const [settings, setSettings] = useState({
    sound: true,
    soft17: true,
    insurance: false,
    advice: false,
  });

  const [bankroll, setBankroll] = useState(INITIAL_BANKROLL);
  const [roundBet, setRoundBet] = useState(baseBet);

  // ===== High Score (persist) =====
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("blackjackHighScore");
    const n = saved ? Number(saved) : NaN;
    return Number.isFinite(n) ? n : INITIAL_BANKROLL;
  });

  // ===== Records (Top 5, persist) =====
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem("blackjackRecords");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // update highScore + records only when bankroll becomes a NEW high score
  useEffect(() => {
    if (bankroll <= highScore) return;

    const now = new Date().toLocaleString();
    const newRecord = { bankroll, at: now };

    const updated = [newRecord, ...records]
      .filter((r) => Number.isFinite(Number(r?.bankroll)))
      .sort((a, b) => Number(b.bankroll) - Number(a.bankroll))
      .slice(0, 5);

    setHighScore(bankroll);
    setRecords(updated);

    localStorage.setItem("blackjackHighScore", String(bankroll));
    localStorage.setItem("blackjackRecords", JSON.stringify(updated));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankroll]); // intentionally only depends on bankroll (simple + stable)

  function clearRecords() {
    setRecords([]);
    localStorage.removeItem("blackjackRecords");
  }

  function resetHighScore(initial = INITIAL_BANKROLL) {

  setHighScore(initial);

  // reset
  setRecords([]);

  //  localStorage
  localStorage.setItem("blackjackHighScore", String(initial));
  localStorage.removeItem("blackjackRecords");

}

  // ===== Round state =====
  const [result, setResult] = useState("");
  const [roundOver, setRoundOver] = useState(true);

  // ===== Hands =====
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerHidden, setDealerHidden] = useState(true);

  const playerInfo = useMemo(() => handInfo(playerHand), [playerHand]);
  const dealerInfo = useMemo(() => handInfo(dealerHand), [dealerHand]);

  const playerScore = playerInfo.total;
  const dealerScore = dealerHidden ? null : dealerInfo.total;

  function settleText(pTotal, dTotal) {
    if (pTotal > 21) return t.youBustedDealerWins;
    if (dTotal > 21) return t.dealerBustedYouWin;
    if (pTotal > dTotal) return t.youWin;
    if (pTotal < dTotal) return t.dealerWins;
    return t.pushTie;
  }

  function settleAndUpdateBankroll(pTotal, dTotal, betAmount) {
    const text = settleText(pTotal, dTotal);

    // loss
    if (pTotal > 21 || (dTotal <= 21 && pTotal < dTotal)) {
      setBankroll((b) => b - betAmount);
      return text;
    }

    // win
    if (dTotal > 21 || pTotal > dTotal) {
      setBankroll((b) => b + betAmount);
      return text;
    }

    // push
    return text;
  }

  function startNewRound() {
    if (bankroll < baseBet) {
      setResult(t.outOfChips);
      setRoundOver(true);
      setDealerHidden(false);
      return;
    }

    setRoundBet(baseBet);
    setResult("");
    setRoundOver(false);

    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard(), drawCard()]);
    setDealerHidden(true);
  }

  function handleDeal() {
    if (!roundOver) return;
    startNewRound();
  }

  function handleHit() {
    if (roundOver) return;
    setPlayerHand((prev) => [...prev, drawCard()]);
  }

  // auto settle on bust
  useEffect(() => {
    if (roundOver) return;
    if (playerScore <= 21) return;

    setDealerHidden(false);

    const dTotalNow = handInfo(dealerHand).total;
    const text = settleAndUpdateBankroll(playerScore, dTotalNow, roundBet);

    setResult(text);
    setRoundOver(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerScore]);

  function handleStand() {
    if (roundOver) return;

    setDealerHidden(false);

    const { dealerFinalHand, dealerTotal } = runDealerTurn(dealerHand);
    const pTotal = handInfo(playerHand).total;

    const text = settleAndUpdateBankroll(pTotal, dealerTotal, roundBet);

    setDealerHand(dealerFinalHand);
    setResult(text);
    setRoundOver(true);
  }

  function handleDouble() {
    if (roundOver) return;
    if (playerHand.length !== 2) return;

    const doubled = roundBet * 2;

    if (bankroll < doubled) {
      setResult(t.notEnoughToDouble);
      return;
    }

    setRoundBet(doubled);

    const nextHand = [...playerHand, drawCard()];
    setPlayerHand(nextHand);

    const pTotal = handInfo(nextHand).total;

    setDealerHidden(false);

    // bust after double
    if (pTotal > 21) {
      const dTotalNow = handInfo(dealerHand).total;
      const text = settleAndUpdateBankroll(pTotal, dTotalNow, doubled);
      setResult(text);
      setRoundOver(true);
      return;
    }

    const { dealerFinalHand, dealerTotal } = runDealerTurn(dealerHand);
    const text = settleAndUpdateBankroll(pTotal, dealerTotal, doubled);

    setDealerHand(dealerFinalHand);
    setResult(text);
    setRoundOver(true);
  }

  const disableDeal = !roundOver;

  return (
    <>
      <GameTable>
        <TopBar
          bankroll={bankroll}
          highScore={highScore}
          bet={roundBet}
          result={result}
          hint={t.doubleHint}
          onDeal={handleDeal}
          onOpenRecords={() => setShowRecords(true)}
          onOpenSettings={() => setShowSettings(true)}
          dealDisabled={disableDeal}
        />

        <DealerArea hand={dealerHand} hidden={dealerHidden} score={dealerScore} />
        <PlayerArea hand={playerHand} score={playerScore} />

        <ActionBar
          onHit={handleHit}
          onStand={handleStand}
          onDouble={handleDouble}
          disableHit={roundOver}
          disableStand={roundOver}
          disableDouble={roundOver || playerHand.length !== 2}
        />
      </GameTable>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        setSettings={setSettings}
      />

      <RecordsModal
        open={showRecords}
        onClose={() => setShowRecords(false)}
        records={records}
        onClear={clearRecords}
        onResetHighScore={resetHighScore}
        initialBankroll={INITIAL_BANKROLL}
      />
    </>
  );
}