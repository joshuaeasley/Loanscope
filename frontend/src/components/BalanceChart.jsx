import { useState } from "react";
import { formatCurrency } from "../formatCurrency";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0].payload;

  return (
        <div style={{background: "#222", color: "#fff", border: "1px solid #888", padding: 8}}>
      <p>Month {row.payment_number}</p>
      <p>Balance: {formatCurrency(row.balance)}</p>
      <p>Cumulative interest: {formatCurrency(row.cumulative_interest)}</p>
    </div>
  );
}

function BalanceChart({ rows }) {
  const [showInterest, setShowInterest] = useState(false);

  return (
    <div className="card">
      <h2>Remaining balance</h2>

      <label htmlFor="interest-toggle">
        <input
          type="checkbox"
          id="interest-toggle"
          checked={showInterest}
          onChange={(event) => setShowInterest(event.target.checked)}
        />
        Show cumulative interest paid
      </label>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="payment_number"
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis width={90} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
          />
          {showInterest && (
            <Line
              type="monotone"
              dataKey="cumulative_interest"
              stroke="#82ca9d"
              dot={false}
              isAnimationActive={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;