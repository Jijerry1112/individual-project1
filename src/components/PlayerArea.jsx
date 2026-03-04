import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";
import Card from "./Card";

export default function PlayerArea({ hand = [], score = 0 }) {
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
          <Card key={`${rank}-${index}`} label={rank} faceDown={false} />
        ))}
      </div>
    </section>
  );
}