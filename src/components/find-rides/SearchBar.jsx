function SearchBar({
  from,
  setFrom,
  to,
  setTo,
  onSearch,
}) {
  return (
    <div className="card shadow-sm border-0 p-4">

      <div className="row g-3 align-items-end">

        {/* From */}
        <div className="col-md-3">
          <label className="form-label fw-semibold">
            From
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Pickup location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        {/* To */}
        <div className="col-md-3">
          <label className="form-label fw-semibold">
            To
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="col-md-2">
          <label className="form-label fw-semibold">
            Date
          </label>

          <input
            type="date"
            className="form-control"
          />
        </div>

        {/* Seats */}
        <div className="col-md-2">
          <label className="form-label fw-semibold">
            Seats
          </label>

          <select className="form-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Search */}
        <div className="col-md-2 d-grid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSearch}
          >
            Search
          </button>
        </div>

      </div>

    </div>
  );
}

export default SearchBar;