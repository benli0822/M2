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
            "_firstName":"admin",
            "_lastName":"admin",
            "_address":"lille1",
            "_list_class":[],
            "_pwd":"admin",
            "firstName":"admin",
            "lastName":"admin",
            "address":"lille1",
            "pwd":"admin",
            "_type_of_person":"Secretary",
            "type_of_person":"Secretary"
        }];

        localStorage.setItem("secretaryList", JSON.stringify(testSecretaryList));

        var sedb =  new SecretaryDB();

        equal(sedb.secretaryList[0].type_of_person, "Secretary",
            "Initialisation will take whatever already existed in the local storage");
    }
);

