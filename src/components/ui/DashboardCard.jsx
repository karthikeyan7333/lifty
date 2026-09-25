function DashboardCard({
  title,
  from,
  to,
  date,
  time,
}) {
  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">

        <h4 className="fw-bold mb-4">
          🚗 {title}
        </h4>

        <div className="row">

          <div className="col-md-3">
            <strong>From</strong>
            <p>{from}</p>
          </div>

          <div className="col-md-3">
            <strong>To</strong>
            <p>{to}</p>
          </div>

          <div className="col-md-3">
            <strong>Date</strong>
            <p>{date}</p>
          </div>

          <div className="col-md-3">
            <strong>Time</strong>
            <p>{time}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard;