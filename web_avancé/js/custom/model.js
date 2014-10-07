/**
 * Created by CHENG Xiaojun et JIN Benli on 24/09/14.
 */

/**
 * Prototype for Person
 * @type_of_person {{firstName: string, lastName: string, address: string, type_of_person: string, say: say}}
 */
Person = function (firstName, lastName, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.list_class = new Array();
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

    get_class_list: function(){
        return this.list_class;
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

    this.add_a_class = function (value) {
        this.list_class.push(value);
    }


}


/**
 * Prototype for class
 * @type_of_person {{name: string, type_of_person: string, description: description}}
 */

Class = function (name,teacher,duration,client,starttime) {
    this.name = name;
    this.teacher = teacher;
    this.duration = duration;
    this.client = client;
    this.startTime = starttime;
}

Class.prototype = {
    name: "",
    type: "",
    duration:"",
    teacher:{},
    client:{},
    startTime:""
}

Class.DriveClass = function (name, duration,teacher,client,startTime) {
    Class.call(name,teacher,duration,client,startTime);
    this.type = "Drive";
    this.duration = duration;
    this.teacher = teacher;
    this.client = client;
    this.startTime = startTime;

}



Class.LectureClass = function (name) {
    Class.call(this, name);
    this.type = "Lecture";
}



