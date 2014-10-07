/**
 * Created by benli on 24/09/14.
 */

/**
 * Prototype for Person
 * @type_of_person {{firstName: string, lastName: string, address: string, type_of_person: string, say: say}}
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
    type_of_person: "",
    list_class:[],
    say: function () {
        console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
    },
    add_a_class: function(value){
        this.list_class.push(value);
    }
}


//client
Person.Client = function (firstName, lastName, address, freeTime) {
    Person.call(this, firstName, lastName, address);
    this.type_of_person = "Client";
    this.freeTime = freeTime;



}

Person.Secretary = function () {
    Person.call(this);
    this.type_of_person = "Secretary";
}

Person.Teacher = function (firstName, lastName, address, freeTime) {
    Person.call(this, firstName, lastName, address);
    this.type_of_person = "Teacher";
    this.freeTime = freeTime;




}


/**
 * Prototype for class
 * @type_of_person {{name: string, type_of_person: string, description: description}}
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
    startTime:"",
    description: function () {
        console.log("This is " + this.name + " of type_of_person " + this.type);
    }
}

Class.DriveClass = function (name, duration,teacher,student,startTime) {
    Class.call(this, name);
    this.type = "Drive";
    this.duration = duration;
    this.teacher = teacher;
    this.student = student;
    this.startTime = startTime;

}



Class.LectureClass = function (name) {
    Class.call(this, name);
    this.type = "Lecture";
}



