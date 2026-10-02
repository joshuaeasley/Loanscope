const API_URL = "http://localhost:8000";

export async function fetchSchedule(loan) {
  const response = await fetch(`${API_URL}/api/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loan),
  });
  const data = await response.json();

  if (!response.ok) {
    // 400 gives detail as a string, 422 gives it as a list
    const message =
      typeof data.detail === "string" ? data.detail : "Invalid input.";
    throw new Error(message);
  }
  return data;
}