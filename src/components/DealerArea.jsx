import Card from "./Card";

export default function DealerArea() {
  return (
    <section className="hand-area">
      <header className="hand-header">
        <h2 className="hand-title">Dealer</h2>
        <div className="hand-meta">Score: ?</div>
      </header>

      <div className="hand-cards">
        <Card label="J♠" />
        <Card label="Hidden" faceDown />
      </div>
    </section>
  );
}