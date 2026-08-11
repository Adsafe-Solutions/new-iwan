import "./Topbar.css";

export default function Topbar({ overlay = false, hidden = false }) {
  return (
    <div
      className={`topbar${overlay ? " overlay" : ""}${hidden ? " tucked" : ""}`}
      aria-hidden={hidden}
    >
      <div className="container topbar__inner">
        <span className="dot" />
        <span className="topbar__live">Emergency Monitor</span>
        <span className="topbar__badge">• Live</span>
      </div>
    </div>
  );
}
