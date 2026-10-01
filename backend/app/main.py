from datetime import date
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from app.engine import (
    dollars_to_cents,
    cents_to_dollars,
    percent_to_basis_points,
    generate_schedule,
)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"status": "ok"}

class LoanData(BaseModel):
    principal: float = Field(ge=1, le=100_000_000)
    interest_rate: float = Field(ge=0, le=40)
    payment: float = Field(ge=1)


@app.post("/api/schedule")
def create_schedule(loan: LoanData):
    #cents/basis points for the engine
    try:
        result = generate_schedule(
            dollars_to_cents(loan.principal),
            percent_to_basis_points(loan.interest_rate),
            dollars_to_cents(loan.payment),
            date.today(),
        )
    except ValueError as error:
        #payment too low
        raise HTTPException(status_code=400, detail=str(error))

    # cents to dollars for response
    rows = []
    for r in result["rows"]:
        rows.append({
            "payment_number": r["payment_number"],
            "payment": cents_to_dollars(r["payment_cents"]),
            "principal": cents_to_dollars(r["principal_cents"]),
            "interest": cents_to_dollars(r["interest_cents"]),
            "balance": cents_to_dollars(r["balance_cents"]),
            "cumulative_interest": cents_to_dollars(r["cumulative_interest_cents"]),
            "cumulative_principal": cents_to_dollars(r["cumulative_principal_cents"]),
        })

    years, months = divmod(result["months"], 12)

    return {
        "rows": rows,
        "months": result["months"],
        "term_years": years,
        "term_months": months,
        "total_interest": cents_to_dollars(result["total_interest_cents"]),
        "payoff_date": result["payoff_date"],
        "capped": result["capped"],
        "message": "Payoff date exceeds 100 years. Schedule capped at 1,200 months."
        if result["capped"] else None,
    }