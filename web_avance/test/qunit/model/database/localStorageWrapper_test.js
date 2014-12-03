/**
 * Created by benli on 25/11/14.
 */
module("localStorageWrapper", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

QUnit.test("test for wrapper function", function () {
        var lswrapper = new LocalStorageWrapper();

        var student = new Client("bob","bob","Lille","bob");

        var key = lswrapper.getPersonKey(student);

        equal(key, "bobbobLille", "Created key for test student is: bobbobLille");
    }
);
