/**
 * Created by benli on 03/12/14.
 */
module("teacherDB", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

QUnit.test("test for teacher initialisation for the first time", function () {
        localStorage.clear();

        var tdb = new TeacherDB();

        // here we use a deepEqual for a recursive comparison, especially for an empty array
        deepEqual(tdb.teacherList, [], "First tiem teacher database store an empty list");
    }
);

QUnit.test("test for teacher initialisation with reloading local storage's content", function () {

    }
);