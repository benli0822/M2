/**
 * Created by benli on 19/11/14.
 */
module("class", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

/**
 * Test for constructing a lecture class
 */
test("test construct lecture class", function () {
        var testDate = new Date(2014, 9, 18, 8, 0, 0, 0);
        var c = new LectureClass("OTI", 1, "Bob", "Alice", 8, testDate);
        equal(c.name, "OTI", "name = OTI");
        equal(c.type, "lecture", "type = lecture");

    }
);

/**
 * Test for constructing a drive class
 */
test("test construct drive class", function () {
        var testDate = new Date(2014, 9, 18, 8, 0, 0, 0);
        var c = new DriveClass("OTI", 1, "Bob", "Alice", 8, testDate);
        equal(c.name, "OTI", "name = OTI");
        equal(c.type, "drive", "type = drive");
    }
);


test("test for hierarchy", 2, function () {
        var testDate = new Date(2014, 9, 18, 8, 0, 0, 0);
        var testLectureClass = new LectureClass("OTI", 1, "Bob", "Alice", 8, testDate);
        var testDriveClass = new DriveClass("OTI", 1, "Bob", "Alice", 8, testDate);
        var proto = Class;
        ok(proto == testLectureClass.__proto__.constructor, "Lecture Class hierarchy from Class");
        ok(proto == testDriveClass.__proto__.constructor, "Drive Class hierarchy from Class");
    }
);

/**
 * In order to reuse the context in local storage, a object means to cast the object into
 * the right type
 */
test("test for creating lecture class from json object", function () {
        var testObject = {
            "_name": "drive",
            "_teacher": "Jean.Pierre",
            "_duration": 1,
            "_client": "stu1.stu1",
            "_startTime": 8,
            "_date": "2014-10-18T06:00:00.000Z",
            "name": "lecture",
            "teacher": "Jean.Pierre",
            "duration": 1,
            "client": "stu1.stu1",
            "startTime": 8,
            "date": "2014-10-18T06:00:00.000Z",
            "id": "2014.10.18.8.Jean.Pierre",
            "_type": "drive",
            "type": "drive",
            "_id": "2014.10.18.8.Jean.Pierre"
        };

        var createdLectureClass = LectureClassObjectHelper.createFromObject(testObject);
        equal(createdLectureClass.teacher, "Jean.Pierre", "created teacher = Jean.Pierre");
        equal(createdLectureClass.type, "lecture", "created type = lecture");
    }
);

/**
 * In order to reuse the context in local storage, a object means to cast the object into
 * the right type
 */
test("test for creating drive class from json object", function () {
        var testObject = {
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
        };

        var createdLectureClass = DriveClassObjectHelper.createFromObject(testObject);
        equal(createdLectureClass.teacher, "Jean.Pierre", "created teacher = Jean.Pierre");
        equal(createdLectureClass.type, "drive", "created type = drive");
    }
);