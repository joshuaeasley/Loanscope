import { useState } from "react";

const PAGE_SIZE = 12;

function ScheduleTable({ rows }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const lastPage = Math.ceil(rows.length / PAGE_SIZE) - 1;
  const currentPage = Math.min(page, lastPage);

  const start = currentPage * PAGE_SIZE;
  const visibleRows = rows.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h2>Schedule</h2>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? "Hide schedule" : "Show schedule"}
      </button>

      {open && (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.payment_number}>
                  <td>{row.payment_number}</td>
                  <td>${row.payment.toFixed(2)}</td>
                  <td>${row.principal.toFixed(2)}</td>
                  <td>${row.interest.toFixed(2)}</td>
                  <td>${row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            {" "}Page {currentPage + 1} of {lastPage + 1}{" "}
          </span>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ScheduleTable;