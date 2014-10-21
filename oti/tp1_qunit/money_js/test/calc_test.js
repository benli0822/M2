module("calc", {
//	setup:function(){alert("setup moneyOps individual test");},
//	teardown:function(){alert("teardown moneyOps individual test");}
});

test("test_computeresults", 1, function () {
        var fixture = "";
        fixture += ("<form id='form0'>");
        fixture += ("<input type='text' id='v1' name='v1' value='2'/>");
        fixture += ("<input type='text' id='c1' name='c1' value='EU'/>");
        fixture += ("<input type='text' id='v2' name='v2' value='2'/>");
        fixture += ("<input type='text' id='c2' name='c2' value='EU'/>");
        fixture += ("<input type='text' id='ops' name='ops' value='ADD'/>");
        fixture += ("</form>");


        var fixtureNode = document.getElementById("qunit-fixture");
        fixtureNode.innerHTML = fixture;


        var c = new calc();
        c.computeResult(document.getElementById('form0'));
        equal(c.message, "Result : 4 (EU)");
    }
);


test("test_computeresults_other", 1, function () {
        var fixture = "";
        fixture += ("<div id='res'></div>");
        fixture += ("<form id='form0'>");
        fixture += ("<input type='text' id='v1' name='v1' value='2'/>");
        fixture += ("<input type='text' id='c1' name='c1' value='EU'/>");
        fixture += ("<input type='text' id='v2' name='v2' value='2'/>");
        fixture += ("<input type='text' id='c2' name='c2' value='EU'/>");
        fixture += ("<input type='text' id='ops' name='ops' value='SUB'/>");
        fixture += ("</form>");


        var fixtureNode = document.getElementById("qunit-fixture");
        fixtureNode.innerHTML = fixture;


        var c = new calc();
        c.computeResult(document.getElementById('form0'));
        equal(c.message, "Unsupported operation SUB");
    }
);

test("test_displayResult", 1, function () {
        var fixture = "";
        fixture += ("<div id='res'></div>");


        var fixtureNode = document.getElementById("qunit-fixture");
        fixtureNode.innerHTML = fixture;


        var c = new calc();
        c.message = "Result : 4 (EU)";
        c.displayResult(document.getElementById('res'));
        equal(document.getElementById('res').innerHTML, "Result : 4 (EU)");
    }
);

test("test_devises_incompatibles", function() {
    var fixture = "";
    fixture += ("<div id='res'></div>");
    fixture += ("<form id='form0'>");
    fixture += ("<input type='text' id='v1' name='v1' value='2'/>");
    fixture += ("<input type='text' id='c1' name='c1' value='EU'/>");
    fixture += ("<input type='text' id='v2' name='v2' value='2'/>");
    fixture += ("<input type='text' id='c2' name='c2' value='CH'/>");
    fixture += ("<input type='text' id='ops' name='ops' value='ADD'/>");
    fixture += ("</form>");

    var fixtureNode = document.getElementById("qunit-fixture");
    fixtureNode.innerHTML = fixture;
    var c = new calc();
    c.computeResult(document.getElementById('form0'));
    equal(c.message, "Devises incompatibles : ");
});