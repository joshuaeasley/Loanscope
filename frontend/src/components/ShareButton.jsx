import { useState } from "react";

function ShareButton({principal, interestRate, payment}) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const params = new URLSearchParams({
      principal: principal,
      rate: interestRate,
      payment: payment,
    });
    const link = `${window.location.origin}${window.location.pathname}?${params}`;

    try {
      await navigator.clipboard.writeText(link);
      setMessage("Link copied to clipboard!");
    } catch (err) {
      setMessage("Could not copy automatically. Copy this link: " + link);
    }
  }

  return (
    <div>
      <button onClick={handleShare}>Share</button>
      {message && <p role="status">{message}</p>}
    </div>
  );
}

export default ShareButton;