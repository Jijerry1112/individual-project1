import { useEffect, useMemo, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

function medalForIndex(i) {
  if (i === 0) return "🥇";
  if (i === 1) return "🥈";
  if (i === 2) return "🥉";
  return "🏅";
}

export default function RecordsModal({
  open,
  onClose,
  records = [],
  onClear,
  onResetHighScore,
  initialBankroll = 100,
}) {
  const { language } = useContext(LanguageContext);
  const t = useMemo(() => (language === "zh" ? zh : en), [language]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const top = [...records]
    .filter((r) => Number.isFinite(Number(r?.bankroll)))
    .sort((a, b) => Number(b.bankroll) - Number(a.bankroll))
    .slice(0, 5);

  const hasRecords = top.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal records-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t.recordsTitle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{t.recordsTitle}</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            {t.close}
          </button>
        </div>

        <div className="modal__content">
          {!hasRecords ? (
            <p className="records-empty">{t.noRecordsYet}</p>
          ) : (
            <ul className="records-list" aria-label={t.recordsTitle}>
              {top.map((r, i) => {
                const tier =
                  i === 0 ? "records-item--top1" :
                  i === 1 ? "records-item--top2" :
                  i === 2 ? "records-item--top3" : "";

                return (
                  <li
                    key={`${r.bankroll}-${r.at}-${i}`}
                    className={`records-item ${tier}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="records-left">
                      <span className="records-medal" aria-hidden="true">
                        {medalForIndex(i)}
                      </span>
                      <span className="records-score">
                        ${Number(r.bankroll)}
                      </span>
                    </div>

                    <div className="records-time">
                      {r.at || ""}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="modal__footer records-footer">
          <button
            className="btn btn--ghost"
            onClick={onClear}
            disabled={!hasRecords}
            title={!hasRecords ? t.noRecordsToClearTitle : ""}
          >
            {t.clearRecords}
          </button>

          <button
            className="btn btn--ghost"
            onClick={() => onResetHighScore?.(initialBankroll)}
            title={t.resetHighScoreTitle}
          >
            {t.resetHighScore}
          </button>

          <button className="btn" onClick={onClose}>
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
}