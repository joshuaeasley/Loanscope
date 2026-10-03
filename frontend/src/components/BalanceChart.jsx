import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BalanceChart({ rows }) {
  return (
    <div>
      <h2>Remaining balance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="payment_number"
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis width={90} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;