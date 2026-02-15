import Card from "./Card";

export default function DealerArea({ hand = [], hidden = true, score }) {
  return (
    <section className="hand-area">
      <header className="hand-header">
        <h2 className="hand-title">Dealer</h2>
        <div className="hand-meta">Score: {hidden ? "?" : score ?? 0}</div>
      </header>

      <div className="hand-cards">
        {hand.map((label, i) => {
          const faceDown = hidden && i === 1; 
          return <Card key={`${label}-${i}`} label={label} faceDown={faceDown} />;
        })}
      </div>
    </section>
  );
}