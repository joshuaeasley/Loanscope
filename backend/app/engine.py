from decimal import Decimal, ROUND_HALF_UP


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