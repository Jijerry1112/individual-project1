import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function PlayerArea({ hand, score }) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  return (
    <section className="hand-area hand-area--player">
      <header className="hand-header">
        <h2 className="hand-title">{t.playerLabel}</h2>
        <div className="hand-meta">
          {t.scoreLabel}: {score}
        </div>
      </header>

      <div className="hand-cards">
        {hand.map((rank, index) => (
          <div
            key={`${rank}-${index}`}
            className="card card--up"
            aria-label={`Card ${rank}`}
          >
            {rank}
          </div>
        ))}
      </div>
    </section>
  );
}