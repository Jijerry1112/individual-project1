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

function drawCard() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return ranks[Math.floor(Math.random() * ranks.length)];
}

function cardValue(rank) {
  if (rank === "A") return 11;
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  return Number(rank);
}

// Best total <= 21 if possible + whether it's soft
function handInfo(hand) {
  let total = 0;
  let aces = 0;

  for (const r of hand) {
    total += cardValue(r);
    if (r === "A") aces += 1;
  }

  // convert A(11)->A(1) as needed
  let conversions = 0;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
    conversions += 1;
  }

  const originalAces = hand.filter((r) => r === "A").length;
  const isSoft = originalAces > conversions;

  return { total, isSoft };
}

function runDealerTurn(startHand, soft17Rule) {
  const d = [...startHand];
  let info = handInfo(d);

  while (info.total < 17 || (soft17Rule && info.total === 17 && info.isSoft)) {
    d.push(drawCard());
    info = handInfo(d);
  }

  return { dealerFinalHand: d, dealerTotal: info.total };
}

export default function App() {
  // ✅ hooks must be INSIDE component
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  const [showSettings, setShowSettings] = useState(false);

  const [settings, setSettings] = useState({
    sound: true,
    soft17: true,
    insurance: false,
    advice: false,
  });

  // --- chips / betting ---
  const baseBet = 10;
  const [bankroll, setBankroll] = useState(100);
  const [roundBet, setRoundBet] = useState(baseBet);

  // --- round state ---
  const [result, setResult] = useState("");
  const [roundOver, setRoundOver] = useState(true);

  // --- hands ---
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerHidden, setDealerHidden] = useState(true);

  const playerInfo = useMemo(() => handInfo(playerHand), [playerHand]);
  const dealerInfo = useMemo(() => handInfo(dealerHand), [dealerHand]);

  const playerScore = playerInfo.total;
  const dealerScore = dealerHidden ? null : dealerInfo.total;

  const playerBusted = playerScore > 21;

  // ---- localized settle text ----
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
    if (pTotal > 21 || (pTotal <= 21 && dTotal <= 21 && pTotal < dTotal)) {
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

  // HIT: just draw
  function handleHit() {
    if (roundOver) return;
    setPlayerHand((prev) => [...prev, drawCard()]);
  }

  // ✅ auto settle on bust using CURRENT hands (avoid stale dealerInfo)
  useEffect(() => {
    if (roundOver) return;
    if (playerScore <= 21) return;

    setDealerHidden(false);
    const dTotalNow = handInfo(dealerHand).total; // current dealer hand
    const finalText = settleAndUpdateBankroll(playerScore, dTotalNow, roundBet);
    setResult(finalText);
    setRoundOver(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerScore, roundOver]);

  function handleStand() {
    if (roundOver) return;

    setDealerHidden(false);

    const { dealerFinalHand, dealerTotal } = runDealerTurn(dealerHand, settings.soft17);
    const pTotal = handInfo(playerHand).total;

    const finalText = settleAndUpdateBankroll(pTotal, dealerTotal, roundBet);

    setDealerHand(dealerFinalHand);
    setResult(finalText);
    setRoundOver(true);
  }

  function handleDouble() {
    if (roundOver) return;
    if (playerHand.length !== 2) return;

    const doubled = roundBet * 2;

    // bankroll is total cash, but you only "pay" after result in this simplified version
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
      const finalText = settleAndUpdateBankroll(pTotal, dTotalNow, doubled);
      setResult(finalText);
      setRoundOver(true);
      return;
    }

    const { dealerFinalHand, dealerTotal } = runDealerTurn(dealerHand, settings.soft17);
    const finalText = settleAndUpdateBankroll(pTotal, dealerTotal, doubled);

    setDealerHand(dealerFinalHand);
    setResult(finalText);
    setRoundOver(true);
  }

  const disableDeal = !roundOver;
  const disableDouble = roundOver || playerHand.length !== 2 || bankroll < roundBet * 2;

  return (
    <>
      <GameTable>
        <TopBar
          bankroll={bankroll}
          bet={roundBet}
          result={result}
          hint={t.doubleHint}
          onDeal={handleDeal}
          onOpenSettings={() => setShowSettings(true)}
          dealDisabled={disableDeal}
        />

        <DealerArea hand={dealerHand} hidden={dealerHidden} score={dealerScore} />
        <PlayerArea hand={playerHand} score={playerScore} />

        <ActionBar
          onHit={handleHit}
          onStand={handleStand}
          onDouble={handleDouble}
          disableHit={roundOver || playerBusted}
          disableStand={roundOver}
          disableDouble={disableDouble}
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