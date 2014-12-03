/**
 * Created by CHENG Xiaojun et JIN Benli on 29/11/14.
 */
var lwrapper = new LocalStorageWrapper();

module("teacherDB", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

test("test for teacher initialisation for the first time", function () {
        localStorage.clear();

        var tdb = new TeacherDB();

        // here we use a deepEqual for a recursive comparison, especially for an empty array
        deepEqual(tdb.teacherList, [], "First tiem teacher database store an empty list");
    }
);

test("test for teacher initialisation with reloading local storage's content", function () {
        localStorage.clear();

        var testTeacherList = [{
            "_firstName": "teacher",
            "_lastName": "teacher",
            "_address": "lille1",
            "_list_class": [],
            "_pwd": "teacher",
            "firstName": "teacher",
            "lastName": "teacher",
            "address": "lille1",
            "pwd": "teacher",
            "_type_of_person": "Teacher",
            "type_of_person": "Teacher"
        }];

        var lwrapper = new LocalStorageWrapper();

        localStorage.setItem("teacherList", JSON.stringify(testTeacherList));

        var tdb = new TeacherDB();

        equal(tdb.teacherList[0].type_of_person, "Teacher",
            "Initialisation will take whatever already existed in the local storage");
    }
);

test("test for adding a teacher", 3, function () {
        localStorage.clear();

        var tdb = new TeacherDB();

        tdb.addTeacher("test", "test", "lille", "test");

        equal(tdb.teacherList.length, 1, "Check only one element for test");
        equal(tdb.teacherList[0].firstName, "test", "Check if has added a new teacher, firstName = test");
        equal(tdb.teacherList[0].type_of_person, "Teacher", "Check if has added a new teacher, type = Teacher");
    }
);

test("test for adding a teacher object", 3, function () {
        localStorage.clear();

        var testTeacher = new Teacher("test", "test", "lille", "test");

        var tdb = new TeacherDB();

        tdb.addTeacherObject(testTeacher);

        equal(tdb.teacherList.length, 1, "Check only one element for test");
        equal(tdb.teacherList[0].firstName, "test", "Check if has added a new teacher, firstName = test");
        equal(tdb.teacherList[0].type_of_person, "Teacher", "Check if has added a new teacher, type = Teacher");
    }
);

test("test a teacher's existence", 2, function () {
        localStorage.clear();

        var testTeacher = new Teacher("test", "test", "lille", "test");

        var tdb = new TeacherDB();

        tdb.addTeacherObject(testTeacher);

        var res = tdb.hasTeacher(testTeacher);

        equal(tdb.teacherList.length, 1, "Check only one element for test");
        ok(res, "Check existence success with test data");
    }
);

test("test teacher close operation", function () {
        localStorage.clear();

        var testTeacher = new Teacher("test", "test", "lille", "test");

        var tdb = new TeacherDB();

        tdb.addTeacherObject(testTeacher);

        tdb.close(1);

        var testTeacherList = [];
        var localTeacherList = JSON.parse(localStorage.getItem("teacherList"));
        for (var i = 0; i < localTeacherList.length; i++) {
            var theTeacher = TeacherObjectHelper.createFromObject(localTeacherList[i]);
            testTeacherList.push(theTeacher);
        }

        equal(tdb.teacherList.length, 1, "Check only one element for test");
        equal(testTeacherList.length, 1, "Check only one element store in local");

        equal(tdb.teacherList[0].firstName, "test", "Check if has added a new teacher, firstName = test");
        equal(tdb.teacherList[0].type_of_person, "Teacher", "Check if has added a new teacher, type = Secretary");

        equal(testTeacherList[0].firstName, "test", "Check if has stored a new secretary in local, firstName = test");
        equal(testTeacherList[0].type_of_person, "Teacher", "Check if has stored a new teacher in local, type = teacher");

    }
);