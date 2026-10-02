import { useState, useEffect } from "react";
import { fetchSchedule } from "./api";
import SliderField from "./components/SliderField";

function App() {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [payment, setPayment] = useState(1500);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
      {error && <p>Error: {error}</p>}
      {result && (
        <p>
          {result.months} months, total interest ${result.total_interest}
        </p>
      )}
    </div>
  );
}

export default App;