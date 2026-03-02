import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function DealerArea({ hand, hidden, score }) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  return (
    <section className="hand-area hand-area--dealer">
      <header className="hand-header">
        <h2 className="hand-title">{t.dealerLabel}</h2>
        <div className="hand-meta">
          {t.scoreLabel}: {hidden ? "?" : score}
        </div>
      </header>

      <div className="hand-cards">
        {hand.map((rank, index) => {
          const faceDown = hidden && index === 1;
          return (
            <div
              key={`${rank}-${index}`}
              className={`card ${faceDown ? "card--down" : "card--up"}`}
              aria-label={faceDown ? "Hidden card" : `Card ${rank}`}
            >
              {faceDown ? "🂠" : rank}
            </div>
          );
        })}
      </div>
    </section>
  );
}