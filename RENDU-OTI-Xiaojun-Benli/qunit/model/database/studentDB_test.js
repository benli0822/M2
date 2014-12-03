/**
 * Created by benli on 03/12/14.
 */
module("studensdb", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

test("test for student initialisation for the first time", function () {
        localStorage.clear();

        var sdb = new StudentDB();

        // here we use a deepEqual for a recursive comparison, especially for an empty array
        deepEqual(sdb.studentList, [], "First time student database store an empty list");
    }
);

test("test for student initialisation with reloading local storage's content", function () {

        localStorage.clear();

        var teststudentList = [{
            "_firstName": "stu1",
            "_lastName": "stu1",
            "_address": "lille1",
            "_list_class": [],
            "_pwd": "stu1",
            "firstName": "stu1",
            "lastName": "stu1",
            "address": "lille1",
            "pwd": "stu1",
            "_type_of_person": "student",
            "type_of_person": "student"
        }];

        localStorage.setItem("studentList", JSON.stringify(teststudentList));

        var sdb = new StudentDB();

        equal(sdb.studentList[0].type_of_person, "Client",
            "Initialisation will take whatever already existed in the local storage");
    }
);

test("test for adding a student", 3, function () {
        localStorage.clear();

        var sdb = new StudentDB();

        sdb.addStudent("test", "test", "lille", "test");

        equal(sdb.studentList.length, 1, "Check only one element for test");
        equal(sdb.studentList[0].firstName, "test", "Check if has added a new student, firstName = test");
        equal(sdb.studentList[0].type_of_person, "Client", "Check if has added a new student, type = Client");
    }
);

test("test for adding a student object", 3, function () {
        localStorage.clear();

        var teststudent = new Client("test", "test", "lille", "test");

        var sdb = new StudentDB();

        sdb.addStudentObject(teststudent);

        equal(sdb.studentList.length, 1, "Check only one element for test");
        equal(sdb.studentList[0].firstName, "test", "Check if has added a new student, firstName = test");
        equal(sdb.studentList[0].type_of_person, "Client", "Check if has added a new student, type = Client");
    }
);

test("test login", 2, function () {
        localStorage.clear();

        var teststudent = new Client("test", "test", "lille", "test");

        var sdb = new StudentDB();

        sdb.addStudentObject(teststudent);

        var res = sdb.student_login("test", "test", "test");

        equal(sdb.studentList.length, 1, "Check only one element for test");
        ok(res, "Login success with test data");
    }
);

test("test a student's existence", 2, function () {
        localStorage.clear();

        var teststudent = new Client("test", "test", "lille", "test");

        var sdb = new StudentDB();

        sdb.addStudentObject(teststudent);

        var res = sdb.hasStudent(teststudent);

        equal(sdb.studentList.length, 1, "Check only one element for test");
        ok(res, "Check existence success with test data");
    }
);

test("test student close operation", function () {
        localStorage.clear();

        var teststudent = new Client("test", "test", "lille", "test");

        var sdb = new StudentDB();

        sdb.addStudentObject(teststudent);

        sdb.close(1);

        var teststudentList = [];
        var localstudentList = JSON.parse(localStorage.getItem("studentList"));
        for (var i = 0; i < localstudentList.length; i++) {
            var thestudent = ClientObjectHelper.createFromObject(localstudentList[i]);
            teststudentList.push(thestudent);
        }

        equal(sdb.studentList.length, 1, "Check only one element for test");
        equal(teststudentList.length, 1, "Check only one element store in local");

        equal(sdb.studentList[0].firstName, "test", "Check if has added a new student, firstName = test");
        equal(sdb.studentList[0].type_of_person, "Client", "Check if has added a new student, type = Client");

        equal(teststudentList[0].firstName, "test", "Check if has stored a new student in local, firstName = test");
        equal(teststudentList[0].type_of_person, "Client", "Check if has stored a new student in local, type = Client");

    }
);