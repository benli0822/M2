/**
 * Created by benli on 24/11/14.
 */
module("secretary", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

/**
 * Test for constructing a secretary class
 */
test("test construct secretary class", 4, function () {
        var c = new Secretary("bob", "bob", "lille", "123");
        equal(c.firstName, "bob", "First Name = bob");
        equal(c.lastName, "bob", "Last Name = bob");
        equal(c.address, "lille", "Address = lille");
        equal(c.type_of_person, "Secretary", "Type = Secretary");

    }
);

test("test for hierarchy", 1, function () {
        var c = new Secretary("bob", "bob", "lille", "123");
        var proto = Person;
        ok(proto == c.__proto__.constructor, "Secretary hierarchy from Person");
    }
);

test("test for creating a secretary from json object", function () {
        var testObject = {
            "_firstName":"admin",
            "_lastName":"admin",
            "_address":"admin",
            "_pwd":"admin",
            "firstName":"admin",
            "lastName":"admin",
            "address":"admin",
            "pwd":"admin",
            "_type_of_person":"Secretary",
            "type_of_person":"Secretary"
        }

        var createdSecretaryClass = SecretaryObjectHelper.createFromObject(testObject);
        equal(createdSecretaryClass.firstName, "admin", "created secretary first name = admin");
        equal(createdSecretaryClass.type_of_person, "Secretary", "created secretary type = Secretary");
    }
);