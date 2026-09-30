from decimal import Decimal, ROUND_HALF_UP
import calendar
from datetime import date

MAX_MONTHS = 1200


def dollars_to_cents(dollars):
    # looks weird but basically just removes the the inaccuracy of floats in python
    return int((Decimal(str(dollars)) * 100).to_integral_value(ROUND_HALF_UP))


def cents_to_dollars(cents: int):
    return cents / 100


def percent_to_basis_points(percent):
    #0.01% = 1 basis point (just avoiding decimals)
    return int((Decimal(str(percent)) * 100).to_integral_value(ROUND_HALF_UP))


def monthly_interest_cents(balance_cents: int, rate_bp: int):
    #Monthly interest = balance * (annual rate / 12) and rounding to the nearest cent 
    monthly_rate = Decimal(rate_bp) / 10000 / 12
    interest = Decimal(balance_cents) * monthly_rate
    return int(interest.to_integral_value(ROUND_HALF_UP))


def add_months(start: date, months: int):

    month_index = start.month - 1 + months
    year = start.year + month_index // 12
    month = month_index % 12 + 1
    # for payoff date and not getting February 31st
    day = min(start.day, calendar.monthrange(year, month)[1])
    return date(year, month, day)


def generate_schedule(principal_cents: int, rate_bp: int, payment_cents: int,
                      start_date: date, max_months: int = MAX_MONTHS):

    balance = principal_cents
    cumulative_interest = 0
    cumulative_principal = 0
    rows = []
    month = 0

    while balance > 0 and month < max_months:
        month += 1
        interest = monthly_interest_cents(balance, rate_bp)
        # last payment only needs to cover whats left
        payment = min(payment_cents, balance + interest)
        principal = payment - interest
        balance -= principal
        cumulative_interest += interest
        cumulative_principal += principal

        rows.append({
            "payment_number": month,
            "payment_cents": payment,
            "principal_cents": principal,
            "interest_cents": interest,
            "balance_cents": balance,
            "cumulative_interest_cents": cumulative_interest,
            "cumulative_principal_cents": cumulative_principal,
        })

    paid_off = balance == 0
    return {
        "rows": rows,
        "months": len(rows),
        "total_interest_cents": cumulative_interest,
        "final_balance_cents": balance,
        "payoff_date": add_months(start_date, len(rows)) if paid_off else None,
    }


