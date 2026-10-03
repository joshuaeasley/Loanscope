export function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "USD",
    }).format(amount);
  } catch (err) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
}