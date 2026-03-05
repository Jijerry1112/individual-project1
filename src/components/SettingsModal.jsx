import { useEffect, useMemo, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import en from "../context/en";
import zh from "../context/zh";

export default function SettingsModal({ open, onClose, settings, setSettings }) {
  const { language, setLanguage } = useContext(LanguageContext);
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

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal settings-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t.settings}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{t.settings}</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            {t.close}
          </button>
        </div>

        <div className="modal__content">
          <div className="settings-grid">
            {/* Language */}
            <div className="setting-row">
              <div className="setting-left">
                <div className="setting-title">{t.languageLabel}</div>
                <div className="setting-desc">{t.languageDesc}</div>
              </div>

              <div className="setting-right">
                <select
                  className="setting-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  aria-label={t.languageLabel}
                >
                  <option value="en">{t.languageEnglish}</option>
                  <option value="zh">{t.languageChinese}</option>
                </select>
              </div>
            </div>

            {/* Sound */}
            <div className="setting-row">
              <div className="setting-left">
                <div className="setting-title">{t.soundLabel}</div>
                <div className="setting-desc">{t.soundDesc}</div>
              </div>

              <div className="setting-right">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={!!settings.sound}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, sound: e.target.checked }))
                    }
                  />
                  <span className="toggle-ui" />
                </label>
              </div>
            </div>

            {/* Soft 17 */}
            <div className="setting-row">
              <div className="setting-left">
                <div className="setting-title">{t.soft17Label}</div>
                <div className="setting-desc">{t.soft17Desc}</div>
              </div>

              <div className="setting-right">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={!!settings.soft17}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, soft17: e.target.checked }))
                    }
                  />
                  <span className="toggle-ui" />
                </label>
              </div>
            </div>

            {/* Insurance */}
            <div className="setting-row">
              <div className="setting-left">
                <div className="setting-title">{t.insuranceLabel}</div>
                <div className="setting-desc">{t.insuranceDesc}</div>
              </div>

              <div className="setting-right">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={!!settings.insurance}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, insurance: e.target.checked }))
                    }
                  />
                  <span className="toggle-ui" />
                </label>
              </div>
            </div>

            {/* Auto advice */}
            <div className="setting-row">
              <div className="setting-left">
                <div className="setting-title">{t.adviceLabel}</div>
                <div className="setting-desc">{t.adviceDesc}</div>
              </div>

              <div className="setting-right">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={!!settings.advice}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, advice: e.target.checked }))
                    }
                  />
                  <span className="toggle-ui" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn" onClick={onClose}>
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
}