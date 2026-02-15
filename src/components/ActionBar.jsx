export default function ActionBar({
  onHit,
  onStand,
  onDeal,
  onOpenSettings,
  disableHit = false,
}) {
  return (
    <section className="action-bar">
      <div className="action-row">
        <button
          className="btn btn--primary"
          onClick={onHit}
          disabled={disableHit}
          title={disableHit ? "Busted (over 21)" : "Draw a card"}
        >
          Hit
        </button>

        <button className="btn" onClick={onStand}>
          Stand
        </button>

        <button className="btn" disabled>
          Double
        </button>
      </div>

      <div className="action-row action-row--secondary">
        <button className="btn btn--ghost" onClick={onDeal}>
          Deal
        </button>
        <button className="btn btn--ghost" onClick={onOpenSettings}>
          Settings
        </button>
      </div>
    </section>
  );
}
