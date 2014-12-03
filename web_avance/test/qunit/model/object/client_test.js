/**
 * Created by CHENG Xiaojun et JIN Benli on 29/11/14.
 */
module("client", {
//	setup:function(){alert("setup class individual test");},
//	teardown:function(){alert("teardown class individual test");}
});

/**
 * Test for constructing a client class
 */
test("test construct client class", 4, function () {
        var c = new Client("bob", "bob", "lille", "123");
        equal(c.firstName, "bob", "First Name = bob");
        equal(c.lastName, "bob", "Last Name = bob");
        equal(c.address, "lille", "Address = lille");
        equal(c.type_of_person, "Client", "Type = Client");

    }
);

test("test for hierarchy", 1, function () {
        var c = new Client("bob", "bob", "lille", "123");
        var proto = Person;
        ok(proto == c.__proto__.constructor, "Client hierarchy from Person");
    }
);

test("test for creating a client from json object", function () {
        var testObject = {
            "_firstName":"stu1",
            "_lastName":"stu1",
            "_address":"stu1",
            "_list_class":["2014.10.18.8.Jean.Pierre","2014.11.21.8.Romain.richard"],
            "_pwd":"123",
            "firstName":"stu1",
            "lastName":"stu1",
            "address":"stu1",
            "pwd":"123",
            "_type_of_person":"Client",
            "type_of_person":"Client"
        }

        var createdClientClass = ClientObjectHelper.createFromObject(testObject);
        equal(createdClientClass.firstName, "stu1", "created client first name = stu1");
        equal(createdClientClass.type_of_person, "Client", "created client type = Client");
    }
);