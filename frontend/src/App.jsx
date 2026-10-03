import { useState, useEffect, useRef } from "react";
import { fetchSchedule } from "./api";
import { readScenarioFromUrl } from "./scenarioURL";
import SliderField from "./components/SliderField";
import Summary from "./components/Summary";
import BalanceChart from "./components/BalanceChart";
import ScheduleTable from "./components/ScheduleTable";

const initial = readScenarioFromUrl();

function App() {
  const [principal, setPrincipal] = useState(initial.scenario.principal);
  const [interestRate, setInterestRate] = useState(initial.scenario.interestRate);
  const [payment, setPayment] = useState(initial.scenario.payment);
  const [urlProblems, setUrlProblems] = useState(initial.problems);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // 0ms for sliders, 300ms for typing
  const delayRef = useRef(0);

  function handleChange(setter, value, source) {
    delayRef.current = source === "number" ? 300 : 0;
    setUrlProblems([]);
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
      {urlProblems.length > 0 && (
        <div role="alert">
          {urlProblems.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}
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