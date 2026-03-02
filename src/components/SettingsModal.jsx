import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function SettingsModal({ open, onClose, settings, setSettings }) {
  const { language, setLanguage } = useContext(LanguageContext);

  if (!open) return null;

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <aside className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <header className="settings-header">
          <h2>Settings</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
        </header>

        <ul className="settings-list">
          <li className="settings-item">
            <span>Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </li>

          <li className="settings-item">
            <span>Sound</span>
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={() => toggle("sound")}
            />
          </li>

          <li className="settings-item">
            <span>Dealer hits on soft 17</span>
            <input
              type="checkbox"
              checked={settings.soft17}
              onChange={() => toggle("soft17")}
            />
          </li>

          <li className="settings-item">
            <span>Insurance</span>
            <input
              type="checkbox"
              checked={settings.insurance}
              onChange={() => toggle("insurance")}
            />
          </li>

          <li className="settings-item">
            <span>Auto advice</span>
            <input
              type="checkbox"
              checked={settings.advice}
              onChange={() => toggle("advice")}
            />
          </li>
        </ul>
      </aside>
    </div>
  );
}