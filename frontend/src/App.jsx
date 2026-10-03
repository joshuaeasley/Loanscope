import { useState, useEffect, useRef } from "react";
import { fetchSchedule } from "./api";
import SliderField from "./components/SliderField";
import Summary from "./components/Summary";
import BalanceChart from "./components/BalanceChart";
import ScheduleTable from "./components/ScheduleTable";

function App() {
  const [principal, setPrincipal] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [payment, setPayment] = useState(1500);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // 0ms for sliders, 300ms for typing
  const delayRef = useRef(0);

  function handleChange(setter, value, source) {
    delayRef.current = source === "number" ? 300 : 0;
    setter(value);
  }

  const monthlyInterest = (principal * (interestRate / 100)) / 12;
  const maxPayment = Math.max(1000000, Math.ceil(3 * monthlyInterest));

  useEffect(() => {
    let ignore = false; // ignore stale responses

    const timer = setTimeout(() => {

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
    }, delayRef.current);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [principal, interestRate, payment]);

  return (
    <div>
      <h1>LoanScope</h1>
      <SliderField
      label="Principal ($)"
      value={principal}
      min={1}
      max={100000000}
      step={1}
      onChange={(value, source) => handleChange(setPrincipal, value, source)}
      />
      <SliderField
        label="Annual interest rate (%)"
        value={interestRate}
        min={0}
        max={40}
        step={0.01}
        onChange={(value, source) => handleChange(setInterestRate, value, source)}
      />
      <SliderField
        label="Monthly payment ($)"
        value={payment}
        min={1}
        max={maxPayment}
        step={1}
        onChange={(value, source) => handleChange(setPayment, value, source)}
      />
      {error && <p role="alert">Error: {error}</p>}
      {result && <Summary result={result} />}
      {result && <BalanceChart rows={result.rows} />}
      {result && <ScheduleTable rows={result.rows} />}
    </div>
  );
}

export default App;