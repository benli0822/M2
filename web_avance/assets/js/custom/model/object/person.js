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
Person = function (firstName, lastName, address, pwd) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._address = address;
    this._list_class = [];
    this._pwd = pwd;

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
    /* getter and setter list_class */
    this.__defineGetter__("pwd", function () {
        return this._pwd;
    });
    this.__defineSetter__("pwd", function (value) {
        return this._pwd = value;
    });
}


/**
 * Prototype for Person
 * @type_of_person {{firstName: string, lastName: string, address: string, type_of_person: string, say: say}}
 */
Person.prototype.say = function () {
    console.log("This is" + this.firstName + " " + this.lastName + ", I live in " + this.address);
}

Person.prototype.addAClass = function (the_class) {
    this.list_class.push(the_class.id);
}

Person.prototype.equals = function (theperson) {
    return (this.firstName === theperson.firstName) &&
        (this.lastName === theperson.lastName) &&
        (this.address === theperson.address) &&
        (this.list_class === theperson.list_class) &&
        (this.pwd === theperson.pwd);
}