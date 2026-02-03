export default function SettingsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <aside
        className="settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="settings-header">
          <h2>Settings</h2>
          <button className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
        </header>

        <ul className="settings-list">
          <li className="settings-item">
            <span>Sound</span>
            <input type="checkbox" defaultChecked />
          </li>
          <li className="settings-item">
            <span>Dealer hits on soft 17</span>
            <input type="checkbox" defaultChecked />
          </li>
          <li className="settings-item">
            <span>Insurance</span>
            <input type="checkbox" />
          </li>
          <li className="settings-item">
            <span>Auto advice</span>
            <input type="checkbox" />
          </li>
        </ul>
      </aside>
    </div>
  );
}