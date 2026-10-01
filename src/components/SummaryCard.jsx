function SummaryCard({ title, count, subtitle, icon, variant = 'success' }) {
  return (
    <article className={`summary-card ${variant}`}>
      <div className="summary-icon">
        {icon}
      </div>

      <div className="summary-content">
        <p className="summary-title">{title}</p>
        <h3 className="summary-count">{count}</h3>
        <p className="summary-subtitle">{subtitle}</p>
      </div>
    </article>
  );
}

export default SummaryCard;