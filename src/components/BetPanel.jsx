import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function BetPanel({
  bankroll,
  pendingBet,
  chips = [10, 25, 50, 100, 500],
  onSetBet,
  onAllIn,
  onReset,
  disabled = false,
}) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  return (
    <section className="bet-panel" aria-label={t.betPanelAriaLabel}>
      <div className="bet-panel__left">
        <div className="bet-panel__label">{t.betPanelBetLabel}</div>
        <div className="bet-panel__value">${pendingBet}</div>
        <div className="bet-panel__bank">
          {t.betPanelBankLabel}: ${bankroll}
        </div>
      </div>

      <div className="bet-panel__chips">
        {chips.map((c) => {
          const tooBig = c > bankroll;
          const isActive = pendingBet === c;

          return (
            <button
              key={c}
              type="button"
              className={`chip ${isActive ? "chip--active" : ""}`}
              onClick={() => onSetBet?.(c)}
              disabled={disabled || tooBig}
              title={
                tooBig
                  ? t.betPanelNotEnoughTitle
                  : `${t.betPanelSetBetTitle} ${c}`
              }
              aria-pressed={isActive}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="bet-panel__right">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onReset}
          disabled={disabled}
          title={t.betPanelResetTitle}
        >
          {t.betPanelReset}
        </button>

        <button
          type="button"
          className="btn"
          onClick={onAllIn}
          disabled={disabled || bankroll <= 0}
          title={t.betPanelAllInTitle}
        >
          {t.betPanelAllIn}
        </button>
      </div>
    </section>
  );
}