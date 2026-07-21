function StatsPanel({
  total,
  completed,
  pending
}) {
  return (
    <section className="stats">

      <div className="stat-card">
        <h2>{total}</h2>
        <p>Total Events</p>
      </div>

      <div className="stat-card">
        <h2>{completed}</h2>
        <p>Completed</p>
      </div>

      <div className="stat-card">
        <h2>{pending}</h2>
        <p>Pending</p>
      </div>

    </section>
  );
}

export default StatsPanel;
