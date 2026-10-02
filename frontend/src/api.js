const API_URL = "http://localhost:8000";

export async function fetchSchedule(loan) {
  const response = await fetch(`${API_URL}/api/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loan),
  });
  const data = await response.json();

  if (!response.ok) {
    let message = "Something went wrong.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      const first = data.detail[0];
      message = `${first.loc[1]}: ${first.msg}`;
    }

    throw new Error(message);
  }
  return data;
}