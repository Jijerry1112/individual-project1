import Card from "./Card";

export default function PlayerArea() {
  return (
    <section className="hand-area">
      <header className="hand-header">
        <h2 className="hand-title">Player</h2>
        <div className="hand-meta">Score: 16</div>
      </header>

      <div className="hand-cards">
        <Card label="6♠" />
        <Card label="Q♦" />
      </div>
    </section>
  );
}