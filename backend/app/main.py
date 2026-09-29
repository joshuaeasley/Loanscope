from fastapi import FastAPI

app = FastAPI(title="LoanScope API")


@app.get("/health")
def health():
    return {"status": "ok"}