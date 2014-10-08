/**
 * Created by CHENG Xiaojun et JIN Benli on 24/09/14.
 */
/**
 * Representation for a general person
 * @param firstName
 * @param lastName
 * @param address
 * @constructor
 */
Person = function (firstName, lastName, address) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._address = address;
    this._list_class = [];

    /* getter and setter for firstName */
    this.__defineGetter__("firstName", function () {
        return this._firstName;
    });
    this.__defineSetter__("firstName", function (value) {
        return this._firstName = value;
    });
    /* getter and setter for lastName */
    this.__defineGetter__("lastName", function () {
        return this._lastName;
    });
    this.__defineSetter__("lastName", function (value) {
        return this._lastName = value;
    });
    /* getter and setter for address */
    this.__defineGetter__("address", function () {
        return this._address;
    });
    this.__defineSetter__("address", function (value) {
        return this._address = value;
    });
    /* getter and setter list_class */
    this.__defineGetter__("list_class", function () {
        return this._list_class;
    });
    this.__defineSetter__("list_class", function (value) {
        return this._list_class = value;
    });
}


/**
 * Prototype for Person
 * @type_of_person {{firstName: string, lastName: string, address: string, type_of_person: string, say: say}}
 */
Person.prototype = {
    _firstName: "",
    _lastName: "",
    _address: "",
    _type_of_person: "",
    _list_class: [],
    say: function () {
        console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
    },
    get_class_list: function () {
        return this.list_class;
    }

}

/**
 * Representation of a client
 * @param firstName
 * @param lastName
 * @param address
 * @param freeTime
 * @constructor
 */
Person.Client = function (firstName, lastName, address) {
    Person.call(this, firstName, lastName, address);
    this._type_of_person = "Client";
    /* getter and setter for type_of_person */
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

/**
 * Representation for a teacher
 * @param firstName
 * @param lastName
 * @param address
 * @constructor
 */
Person.Teacher = function (firstName, lastName, address) {
    Person.call(this, firstName, lastName, address);
    this._type_of_person = "Teacher";
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

/**
 * Representation for a secretary
 * @constructor
 */
Person.Secretary = function (firstName, lastName, address) {
    Person.call(this, firstName, lastName, address);
    this._type_of_person = "Secretary";
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}