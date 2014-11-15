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

test("test_computeresults_sub", 1, function () {
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
        //equal(c.message, "Unsupported operation SUB");
        // sousraction implementé, donc maintenant ça doit marcher
        equal(c.message, "Result : 0 (EU)");
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
        fixture += ("<input type='text' id='ops' name='ops' value='MUL'/>");
        fixture += ("</form>");

        // donc ici on recrit la fonction window.alert, remplir le res avec le messsage d'erreur pour s'assurer ce qu'on veut
        window.alert = function(s) {
            document.getElementById("res").innerHTML = s;
        }

        var fixtureNode = document.getElementById("qunit-fixture");
        fixtureNode.innerHTML = fixture;

        var c = new calc();
        c.computeResult(document.getElementById('form0'));
        message = document.getElementById("res").innerHTML;
        equal(message, "Unsupported operation MUL");
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

    window.alert = function(s) {
        document.getElementById('res').innerHTML = s;
    }

    var fixtureNode = document.getElementById("qunit-fixture");
    fixtureNode.innerHTML = fixture;
    var c = new calc();
    c.computeResult(document.getElementById('form0'));
    message = document.getElementById("res").innerHTML;
    equal(message, "Not the same currency");
});


test("test_values_negative", function() {
    var fixture = "";
    fixture += ("<div id='res'></div>");
    fixture += ("<form id='form0'>");
    fixture += ("<input type='text' id='v1' name='v1' value='-2'/>");
    fixture += ("<input type='text' id='c1' name='c1' value='EU'/>");
    fixture += ("<input type='text' id='v2' name='v2' value='-2'/>");
    fixture += ("<input type='text' id='c2' name='c2' value='EU'/>");
    fixture += ("<input type='text' id='ops' name='ops' value='ADD'/>");
    fixture += ("</form>");

    window.alert = function(s) {
        document.getElementById('res').innerHTML = s;
    }
    var fixtureNode = document.getElementById("qunit-fixture");
    fixtureNode.innerHTML = fixture;
    var c = new calc();
    c.computeResult(document.getElementById('form0'));
    message = document.getElementById("res").innerHTML;
    equal(message, "Value can not be negative");
});

test("test_values_textual", function() {
    var fixture = "";
    fixture += ("<div id='res'></div>");
    fixture += ("<form id='form0'>");
    fixture += ("<input type='text' id='v1' name='v1' value='abc'/>");
    fixture += ("<input type='text' id='c1' name='c1' value='EU'/>");
    fixture += ("<input type='text' id='v2' name='v2' value='abc'/>");
    fixture += ("<input type='text' id='c2' name='c2' value='EU'/>");
    fixture += ("<input type='text' id='ops' name='ops' value='ADD'/>");
    fixture += ("</form>");

    window.alert = function(s) {
        document.getElementById('res').innerHTML = s;
    }
    var fixtureNode = document.getElementById("qunit-fixture");
    fixtureNode.innerHTML = fixture;
    var c = new calc();
    c.computeResult(document.getElementById('form0'));
    message = document.getElementById("res").innerHTML;
    equal(message, "Please insert number");
});