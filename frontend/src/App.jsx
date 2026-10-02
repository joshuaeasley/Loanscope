import { useState, useEffect } from "react";
import { fetchSchedule } from "./api";
import SliderField from "./components/SliderField";

function App() {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [payment, setPayment] = useState(1500);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const monthlyInterest = (principal * (interestRate / 100)) / 12;
  const maxPayment = Math.max(1000000, Math.ceil(3 * monthlyInterest));

  useEffect(() => {
    let ignore = false; // ignore stale responses

    fetchSchedule({ principal, interest_rate: interestRate, payment })
      .then((data) => {
        if (ignore) return;
        setResult(data);
        setError("");
      })
      .catch((err) => {
        if (ignore) return;
        setResult(null);
        setError(err.message);
      });

    return () => {
      ignore = true;
    };
  }, [principal, interestRate, payment]);

  return (
    <div>
      <h1>LoanScope</h1>
      <SliderField
      label="Principal"
      value={principal}
      min={1}
      max={1000000}
      step={1000}
      onChange={setPrincipal}
      />
      <SliderField
        label="Annual interest rate (%)"
        value={interestRate}
        min={0}
        max={40}
        step={0.01}
        onChange={setInterestRate}
      />
      <SliderField
        label="Monthly payment ($)"
        value={payment}
        min={1}
        max={maxPayment}
        step={1}
        onChange={setPayment}
      />
      {error && <p role="alert">Error: {error}</p>}
      {result && (
        <p>
          {result.months} months, total interest ${result.total_interest}
        </p>
      )}
    </div>
  );
}

export default App;