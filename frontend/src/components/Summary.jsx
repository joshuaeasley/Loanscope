import { formatCurrency } from "../formatCurrency";
function Summary({ result }) {
  const payoffText = result.payoff_date ? result.payoff_date : "N/A";

  return (
    <div>
      <h2>Summary</h2>
      {result.capped && <p role="alert">{result.message}</p>}
      <p>Payoff date: {payoffText}</p>
      <p>
        Term: {result.term_years} years, {result.term_months} months
      </p>
      <p>Total interest: {formatCurrency(result.total_interest)}</p>
    </div>
  );
}

export default Summary;