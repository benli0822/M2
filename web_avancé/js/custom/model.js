/**
 * Created by benli on 24/09/14.
 */

/**
 * Prototype for Person
 * @type {{firstName: string, lastName: string, address: string, type: string, say: say}}
 */
Person.prototype = {
    firstName: "",
    lastName: "",
    address: "",
    type: "",
    say: function () {
        console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
    }
}

Person = function (firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
}


Person.Client = function (firstName, lastName, address, freeTime) {
    Person.call(this, firstName, lastName, address);
    this.type = "Client";
    this.freeTime = freeTime;

    this.__defineGetter__('freeTime', function () {
        return this.freeTime;
    });

}

Person.Secretary = function () {
    Person.call(this);
    this.type = "Secretary";
}

Person.Teacher = function (freeTime) {
    Person.call(this);
    this.type = "Teacher";
    this.freeTime = freeTime;

    this.__defineGetter__('freeTime', function () {
        return this.freeTime;
    });

}


/**
 * Prototype for class
 * @type {{name: string, type: string, description: description}}
 */
Class.prototype = {
    name: "",
    type: "",
    description: function () {
        console.log("This is " + this.name + " of type " + this.type);
    }
}

Class = function (name) {
    this.name = name;
}

Class.DriveClass = function (name) {
    Class.Class.call(this, name);
    this.type = "Drive";
}

Class.LectureClass = function (name) {
    Class.Class.call(this, name);
    this.type = "Lecture";
}



