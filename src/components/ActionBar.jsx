export default function ActionBar({ onOpenSettings }) {
  return (
    <section className="action-bar">
      <div className="action-row">
        <button className="btn btn--primary">Hit</button>
        <button className="btn">Stand</button>
        <button className="btn" disabled>Double</button>
      </div>

      <div className="action-row action-row--secondary">
        <button className="btn btn--ghost">Deal</button>
        <button className="btn btn--ghost" onClick={onOpenSettings}>
          Settings
        </button>
      </div>
    </section>
  );
}