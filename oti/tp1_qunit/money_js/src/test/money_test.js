module("money", {
//	setup:function(){alert("setup money individual test");},
//	teardown:function(){alert("teardown money individual test");}
});

test("test construct money", function () {
        var m = new money(1, "EUR");
        ok(m.v == 1, "valeur = 1");
        equal(m.curr, "EUR", "currency = EUR");
    }
);

test("test accesseurs", 2, function () {
        var m = new money(1, "EUR");
        ok(m.getValue() == 1, "valeur = 1");
        equal(m.getCurrency(), "EUR", "currency = EUR");
    }
);


test("test equals", 4, function () {
        var m1EUR = new money(1, "EUR");
        var m1eur = new money(1, "eur");
        var m1CHF = new money(1, "CHF");
        var m10eur = new money(10, "eur");

        ok(m1EUR.equals(m1EUR), "1 EUR égal à 1 EUR");
        ok(m1EUR.equals(m1eur), "1 EUR égal à 1 eur");
        ok(!m1EUR.equals(m1CHF), "1 EUR diff de 1 CHF");
        ok(!m1EUR.equals(m10eur), "1 EUR diff de 10 eur");
    }
);
