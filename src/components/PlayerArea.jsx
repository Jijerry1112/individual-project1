import Card from "./Card";

export default function PlayerArea({ hand = [], score }) {
  return (
    <section className="hand-area">
      <header className="hand-header">
        <h2 className="hand-title">Player</h2>
        <div className="hand-meta">Score: {score ?? 0}</div>
      </header>

      <div className="hand-cards">
        {hand.map((label, i) => (
          <Card key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </section>
  );
}