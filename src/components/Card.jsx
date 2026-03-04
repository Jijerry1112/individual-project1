export default function Card({ label = "Card", faceDown = false }) {
  return (
    <div
      className={`playing-card ${
        faceDown ? "playing-card--down" : "playing-card--up"
      }`}
    >
      {faceDown ? "🂠" : label}
    </div>
  );
}