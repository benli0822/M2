module("moneyOps", {
//	setup:function(){alert("setup moneyOps individual test");},
//	teardown:function(){alert("teardown moneyOps individual test");}
});

test("test simple add", 2, function () {
        var m1 = new money(1, "EUR");
        var m2 = new money(2, "EUR");
        var m3 = new money(3, "EUR");

        ok(m3.equals(MoneyOps.add(m1, m2)), "3e = 1e+2e");
        deepEqual(m3, MoneyOps.add(m1, m2), "3e = 1e+2e deepEqual");
    }
);


test("test multi devise add", 1, function () {
        var m1 = new money(1, "EUR");
        var m2 = new money(2, "CHF");
        throws(function () {
            var m3 = MoneyOps.add(m1, m2)
        }, DevisesIncompatibleExc, "Devises Incompatibles");
    }
);
