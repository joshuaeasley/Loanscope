# LoanScope

## What is LoanScope?
LoanScope is an interactive loan estimation tool that helps you visualize your loan's lifetime. It calculates:
- Total interest paid on a loan
- The expected payoff date
- Total time until the loan is paid off

These calculations are dynamically generated based on your **principal amount**, **interest rate**, and **monthly payment**.

### Features
* **Interactive Chart:** Visually represents your remaining balance over time, with a toggle to overlay cumulative interest paid.
* **Amortization Table:** A month-by-month breakdown of your payments (split by principal and interest).
* **CSV Export:** Download your complete amortization schedule with the click of a button.
* **Shareable Scenarios:** Easily share your specific loan scenario with friends, family, or a financial advisor using the share button.

---

## How to Run

LoanScope is composed of a FastAPI backend and a React frontend. You will need to run both locally to use the application.

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (for the frontend)
* [Python](https://www.python.org/) 3.10 or newer (for the backend)

### Backend

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi "uvicorn[standard]"
uvicorn app.main:app --reload
```

The API runs at http://localhost:8000. Next time, you only need to run `source venv/bin/activate` and the `uvicorn` line.

### Frontend

Open a second terminal, then run:

```
cd frontend
npm i
npm run dev
```

Open the address it prints, usually http://localhost:5173.