function SLACards({ tickets }) {
  const total = tickets.length;
  const violated = tickets.filter(t => t.escalated).length;
  const met = total - violated;

  return (
    <div className="sla-cards">
      <div className="card">Total Tickets: {total}</div>
      <div className="card success">SLA Met: {met}</div>
      <div className="card danger">SLA Violated: {violated}</div>
    </div>
  );
}

export default SLACards;
