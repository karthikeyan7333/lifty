function StatsCard({ title, value, icon }) {
  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center">

        <div style={{ fontSize: "2rem" }}>
          {icon}
        </div>

        <h3 className="fw-bold mt-3">
          {value}
        </h3>

        <p className="text-secondary mb-0">
          {title}
        </p>

      </div>
    </div>
  );
}

export default StatsCard;