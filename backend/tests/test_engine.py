from app.engine import (
    dollars_to_cents,
    percent_to_basis_points,
    monthly_interest_cents,
)


def test_dollars_to_cents():
    assert dollars_to_cents(19.99) == 1999
    assert dollars_to_cents(10) == 1000


def test_percent_to_basis_points():
    assert percent_to_basis_points(5.25) == 525
    assert percent_to_basis_points(0.01) == 1


def test_monthly_interest():
    # $200,000 at 6% -> $1,000.00 in month one
    assert monthly_interest_cents(20000000, 600) == 100000
    # $1,000 at 5% -> $4.17
    assert monthly_interest_cents(100000, 500) == 417


def test_zero_rate():
    assert monthly_interest_cents(100000, 0) == 0