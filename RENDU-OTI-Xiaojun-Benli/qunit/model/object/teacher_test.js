/**
 * Created by CHENG Xiaojun et JIN Benli on 29/11/14.
 */
module("teacher", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

/**
 * Test for constructing a teacher class
 */
test("test construct teacher class", 4, function () {
        var c = new Teacher("bob", "bob", "lille", "123");
        equal(c.firstName, "bob", "First Name = bob");
        equal(c.lastName, "bob", "Last Name = bob");
        equal(c.address, "lille", "Address = lille");
        equal(c.type_of_person, "Teacher", "Type = Teacher");

    }
);

test("test for hierarchy", 1, function () {
        var c = new Teacher("bob", "bob", "lille", "123");
        var proto = Person;
        ok(proto == c.__proto__.constructor, "Teacher hierarchy from Person");
    }
);

test("test for creating a teacher from json object", function () {
        var testObject = {
            "_firstName":"teacher",
            "_lastName":"teacher",
            "_address":"teacher",
            "_pwd":"teacher",
            "firstName":"teacher",
            "lastName":"teacher",
            "address":"teacher",
            "pwd":"teacher",
            "_type_of_person":"Teacher",
            "type_of_person":"Teacher"
        }

        var createdTeacherClass = TeacherObjectHelper.createFromObject(testObject);
        equal(createdTeacherClass.firstName, "teacher", "created teacher first name = teacher");
        equal(createdTeacherClass.type_of_person, "Teacher", "created teacher type = Teacher");
    }
);