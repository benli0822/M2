/**
 * Created by benli on 29/11/14.
 */
module("classDB", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

test("test for class initialisation for the first time", 1, function () {
        localStorage.clear();

        var cdb = new ClassDB();

        // here we use a deepEqual for a recursive comparison, especially for an empty array
        deepEqual(cdb.classList, [], "First time class database store an empty list");
    }
);

test("test for class initialisation with reloading local storage's content", function () {

        localStorage.clear();

        var testClassList = [{
            "_name": "drive",
            "_teacher": "Jean.Pierre",
            "_duration": 1,
            "_client": "stu1.stu1",
            "_startTime": 8,
            "_date": "2014-10-18T06:00:00.000Z",
            "name": "drive",
            "teacher": "Jean.Pierre",
            "duration": 1,
            "client": "stu1.stu1",
            "startTime": 8,
            "date": "2014-10-18T06:00:00.000Z",
            "id": "2014.10.18.8.Jean.Pierre",
            "_type": "drive",
            "type": "drive",
            "_id": "2014.10.18.8.Jean.Pierre"
        }];

        localStorage.setItem("classList", JSON.stringify(testClassList));

        var cdb = new ClassDB();

        //TODO should we add more?
        equal(cdb.classList[0].name, "drive", "Initialisation will take whatever already existed in localStorage");
    }
);

//TODO tdb cdb sdb should work together
test("test for adding a drive class", function () {
        //localStorage.clear();
        //
        //var sdb = new StudentDB();
        //var tdb = new TeacherDB();
        //var cdb = new ClassDB();
        //
        //var teacher = new Teacher('Jean', 'Pierre', 'lille1', '123');
        //var stu1 = new Client('stu1', 'stu1', 'stu1', '123');
        //var stu2 = new Client('stu2', 'stu2', 'stu2', '123');
        //
        //var testdate1 = new Date(2014, 9, 18, 8, 0, 0, 0);
        //
        //cdb.addAClass('drive', teacher.firstName + "." + teacher.lastName, stu1.firstName + "." + stu1.lastName, 1, 8, testdate1, 'drive', sdb, tdb);
        //
        //equal(cdb.classList[0].)

    }
);

test("test for getting a class by its id", 3, function () {

        // same as test 2 for initialisation
        localStorage.clear();

        var testClassList = [{
            "_name": "drive",
            "_teacher": "Jean.Pierre",
            "_duration": 1,
            "_client": "stu1.stu1",
            "_startTime": 8,
            "_date": "2014-10-18T06:00:00.000Z",
            "name": "drive",
            "teacher": "Jean.Pierre",
            "duration": 1,
            "client": "stu1.stu1",
            "startTime": 8,
            "date": "2014-10-18T06:00:00.000Z",
            "id": "2014.10.18.8.Jean.Pierre",
            "_type": "drive",
            "type": "drive",
            "_id": "2014.10.18.8.Jean.Pierre"
        }];

        localStorage.setItem("classList", JSON.stringify(testClassList));

        var cdb = new ClassDB();


        var res = cdb.getClassById("2014.10.18.8.Jean.Pierre");

        equal(res.type, "drive", "Test if we can get the proper class by its id, type = drive");
        equal(res.teacher, "Jean.Pierre", "Test if we can get the proper class by its id, teacher = Jean.Pierre");
        equal(res.client, "stu1.stu1", "Test if we can get the proper class by its id, student = stu1.stu1");
    }
);

test("test for checking a class's existence", function () {
        localStorage.clear();

        var testDate = new Date(2014, 9, 18, 8, 0, 0, 0);
        var c = new DriveClass("OTI", 1, "Bob", "Alice", 8, testDate);

        var testClassList = [c];

        localStorage.setItem("classList", JSON.stringify(testClassList));

        var cdb = new ClassDB();

        var res = cdb.hasClass(c);

        equal(res, true, "Check with a test class after it has been added into class list");
    }
);

test("test for deleting a class from class database", function () {
        localStorage.clear();

        var testDate = new Date(2014, 9, 18, 8, 0, 0, 0);
        var c = new DriveClass("OTI", 1, "Bob.Bob", "Alice.Alice", 8, testDate);

        var testClassList = [c];

        localStorage.setItem("classList", JSON.stringify(testClassList));

        var cdb = new ClassDB();
        // TODO connection is difficult
        var tdb = new TeacherDB();
        var sdb = new StudentDB();

        cdb.deleteClass("2014.9.18.8.Bob.Bob");

        var res = cdb.hasClass(c);

        equal(res, false, "Check if the test class has been deleted");
    }
);

//TODO test for closing class DB
