/**
 * Created by benli on 24/09/14.
 */
model = {};

model.Person.prototype = {
    firstName: "",
    lastName: "",
    address: "",
    type: "",
    say: function () {
        console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
    }
}

model.Person = function (firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
}

model.Client = function (firstName, lastName, address, freeTime) {
    model.Person.call(this, firstName, lastName, address);
    this.type = "Client";
    this.freeTime = freeTime;
}

model.Secretary = function () {
    model.Person.call(this);
    this.type = "Secretary";
}

model.Teacher = function (freeTime) {
    model.Person.call(this);
    this.type = "Teacher";
    this.freeTime = freeTime;
}

model.Class.prototype = {
    name: "",
    type: "",
    description: function() {
        console.log("This is " + this.name + " of type " + this.type);
    }
}

model.Class = function(name) {
    this.name = name;
}

model.DriveClass = function(name) {
    model.Class.call(this, name);
    this.type = "Drive";
}

model.LectureClass = function(name) {
    model.Class.call(this, name);
    this.type = "Lecture";
}



