/**
 * Created by benli on 29/11/14.
 */
module("secretaryDB", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

test("test for secretary initialisation for the first time", function () {
        localStorage.clear();

        var sedb = new SecretaryDB();

        // here we use a deepEqual for a recursive comparison, especially for an empty array
        deepEqual(sedb.secretaryList, [], "First time secretary database store an empty list");
    }
);

test("test for secretary initialisation with reloading local storage's content", function () {

        localStorage.clear();

        var testSecretaryList = [{
            "_firstName": "admin",
            "_lastName": "admin",
            "_address": "lille1",
            "_list_class": [],
            "_pwd": "admin",
            "firstName": "admin",
            "lastName": "admin",
            "address": "lille1",
            "pwd": "admin",
            "_type_of_person": "Secretary",
            "type_of_person": "Secretary"
        }];

        localStorage.setItem("secretaryList", JSON.stringify(testSecretaryList));

        var sedb = new SecretaryDB();

        equal(sedb.secretaryList[0].type_of_person, "Secretary",
            "Initialisation will take whatever already existed in the local storage");
    }
);

test("test for adding a secretary", 3, function () {
        localStorage.clear();

        var sedb = new SecretaryDB();

        sedb.addSecretary("test", "test", "lille", "test");

        equal(sedb.secretaryList.length, 1, "Check only one element for test");
        equal(sedb.secretaryList[0].firstName, "test", "Check if has added a new secretary, firstName = test");
        equal(sedb.secretaryList[0].type_of_person, "Secretary", "Check if has added a new secretary, type = Secretary");
    }
);

test("test for adding a secretary object", 3, function () {
        localStorage.clear();

        var testSecretary = new Secretary("test", "test", "lille", "test");

        var sedb = new SecretaryDB();

        sedb.addSecretaryObject(testSecretary);

        equal(sedb.secretaryList.length, 1, "Check only one element for test");
        equal(sedb.secretaryList[0].firstName, "test", "Check if has added a new secretary, firstName = test");
        equal(sedb.secretaryList[0].type_of_person, "Secretary", "Check if has added a new secretary, type = Secretary");
    }
);

test("test login", 2, function () {
        localStorage.clear();

        var testSecretary = new Secretary("test", "test", "lille", "test");

        var sedb = new SecretaryDB();

        sedb.addSecretaryObject(testSecretary);

        var res = sedb.login_secretary("test", "test", "test");

        equal(sedb.secretaryList.length, 1, "Check only one element for test");
        ok(res, "Login success with test data");
    }
);

test("test a secretary's existence", 2, function () {
        localStorage.clear();

        var testSecretary = new Secretary("test", "test", "lille", "test");

        var sedb = new SecretaryDB();

        sedb.addSecretaryObject(testSecretary);

        var res = sedb.hasSecretary(testSecretary);

        equal(sedb.secretaryList.length, 1, "Check only one element for test");
        ok(res, "Check existence success with test data");
    }
);

test("test secretary close operation", function () {
        localStorage.clear();

        var testSecretary = new Secretary("test", "test", "lille", "test");

        var sedb = new SecretaryDB();

        sedb.addSecretaryObject(testSecretary);

        sedb.close(1);

        var testSecretaryList = [];
        var localSecretaryList = JSON.parse(localStorage.getItem("secretaryList"));
        for (var i = 0; i < localSecretaryList.length; i++) {
            var theSecretary = SecretaryObjectHelper.createFromObject(localSecretaryList[i]);
            testSecretaryList.push(theSecretary);
        }

        equal(sedb.secretaryList.length, 1, "Check only one element for test");
        equal(testSecretaryList.length, 1, "Check only one element store in local");

        equal(sedb.secretaryList[0].firstName, "test", "Check if has added a new secretary, firstName = test");
        equal(sedb.secretaryList[0].type_of_person, "Secretary", "Check if has added a new secretary, type = Secretary");

        equal(testSecretaryList[0].firstName, "test", "Check if has stored a new secretary in local, firstName = test");
        equal(testSecretaryList[0].type_of_person, "Secretary", "Check if has stored a new secretary in local, type = Secretary");

    }
);