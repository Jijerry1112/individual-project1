export default function Card({ label = "Card", faceDown = false }) {
  return (
    <div className={`card ${faceDown ? "card--down" : "card--up"}`}>
      {faceDown ? "🂠" : label}
    </div>
  );
}