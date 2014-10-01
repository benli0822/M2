/**
 * Created by benli on 24/09/14.
 */

/**
 * Prototype for Person
 * @type {{firstName: string, lastName: string, address: string, type: string, say: say}}
 */
Person = function (firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
}

Person.prototype = {
    firstName: "",
    lastName: "",
    address: "",
    type: "",
    say: function () {
        console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
    }
}

Person.Client = function (firstName, lastName, address, freeTime) {
    Person.call(this, firstName, lastName, address);
    this.type = "Client";
    this.freeTime = freeTime;


    var list_class = [];

    /**
     * add a class to a student
     * @param value
     */
    function add_class(value){
        this.list_class.push(value);
    };
}

Person.Secretary = function () {
    Person.call(this);
    this.type = "Secretary";
}

Person.Teacher = function (firstName, lastName, address, freeTime) {
    Person.call(this, firstName, lastName, address);
    this.type = "Teacher";
    this.freeTime = freeTime;

    var list_class = [];

    /**
     * add a class to a teacher
     * @param value
     */
    function add_class(value){
          this.list_class.push(value);
    };


}


/**
 * Prototype for class
 * @type {{name: string, type: string, description: description}}
 */

Class = function (name) {
    this.name = name;
}

Class.prototype = {
    name: "",
    type: "",
    duration:"",
    teacher:"",
    student:"",
    description: function () {
        console.log("This is " + this.name + " of type " + this.type);
    }
}

Class.DriveClass = function (name) {
    Class.call(this, name);
    this.type = "Drive";
}

Class.LectureClass = function (name) {
    Class.call(this, name);
    this.type = "Lecture";
}



