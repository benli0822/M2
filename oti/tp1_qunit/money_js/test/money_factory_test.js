/**
 * Created by benli on 20/10/14.
 */
module("moneyFactory", {
//	setup:function(){alert("setup money individual test");},
//	teardown:function(){alert("teardown money individual test");}
});

test("test construct money", function () {
        var moneyFactory = new MoneyFactory();
        m = moneyFactory.createMoney({
            v: 1,
            curr: "EUR"
        });
        ok(m.getValue() == 1, "valeur = 1");
        equal(m.getCurrency(), "EUR", "currency = EUR");
    }
);

test("test accesseurs", 2, function () {
        var moneyFactory = new MoneyFactory();
        m = moneyFactory.createMoney({
            v: 1,
            curr: "EUR"
        });
        ok(m.getValue() == 1, "valeur = 1");
        equal(m.getCurrency(), "EUR", "currency = EUR");
    }
);

test("test equals", 4, function () {
        var moneyFactory = new MoneyFactory();
        var m1EUR = new money(1, "EUR");
        var m1eur = new money(1, "eur");
        var m1CHF = new money(1, "CHF");
        var m10eur = new money(10, "eur");
        var f1EUR = moneyFactory.createMoney({
            v: 1,
            curr: "EUR"
        });

        ok(m1EUR.equals(f1EUR), "1 EUR égal à 1 EUR");
        ok(f1EUR.equals(m1eur), "1 EUR égal à 1 eur");
        ok(!f1EUR.equals(m1CHF), "1 EUR diff de 1 CHF");
        ok(!f1EUR.equals(m10eur), "1 EUR diff de 10 eur");
    }
);

test("test construct money not predefine ", 1, function () {
        var moneyFactory = new MoneyFactory();

        throws(function () {
            var m = moneyFactory.createMoney({
                v: 1,
                curr: "EURZS"
            })
        }, UnexistingCurrencyExc, "Curr not found exception");
    }
);