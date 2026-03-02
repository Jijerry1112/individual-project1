import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function TopBar({
  bankroll,
  bet,
  result,
  onDeal,
  onOpenSettings,
  dealDisabled = false,
  hint = "", // ✅ new
}) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  return (
    <header className="topbar">
      <div className="topbar__left">
        <span className="topbar__label">
          {t.bankrollLabel}: <strong>${bankroll}</strong>
        </span>
        <span className="topbar__sep">|</span>
        <span className="topbar__label">
          {t.betLabel}: <strong>${bet}</strong>
        </span>
      </div>

      <div className="topbar__center" aria-live="polite">
        {/* ✅ 优先显示 result，没有就显示 hint */}
        {result || hint || "\u00A0"}
      </div>

      <div className="topbar__right">
        <button
          className="btn btn--ghost"
          onClick={onDeal}
          disabled={dealDisabled}
          title={dealDisabled ? t.dealDisabledTitle : t.dealTitle}
        >
          {t.deal}
        </button>
        <button className="btn btn--ghost" onClick={onOpenSettings}>
          {t.settings}
        </button>
      </div>
    </header>
  );
}
