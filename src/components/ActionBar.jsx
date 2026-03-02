import { useContext, useMemo } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function ActionBar({
  onHit,
  onStand,
  onDouble,
  disableHit = false,
  disableStand = false,
  disableDouble = true,
}) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  return (
    <section className="action-bar">
      <div className="action-row">
        <button
          className="btn btn--primary"
          onClick={onHit}
          disabled={disableHit}
          title={disableHit ? t.bustedTitle : t.hitTitle}
        >
          {t.hit}
        </button>

        <button
          className="btn"
          onClick={onStand}
          disabled={disableStand}
          title={disableStand ? t.roundOverTitle : t.standTitle}
        >
          {t.stand}
        </button>

        <button
          className="btn"
          onClick={onDouble}
          disabled={disableDouble}
          title={disableDouble ? t.doubleDisabledTitle : t.doubleTitle}
        >
          {t.double}
        </button>
      </div>
    </section>
  );
}