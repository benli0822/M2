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



