var MoneyOps = function () {
}

MoneyOps.add = function (m1, m2) {
    return new money(m1.getValue() + m2.getValue(), m1.getCurrency());
}