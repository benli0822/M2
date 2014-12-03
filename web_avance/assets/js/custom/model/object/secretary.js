/**
 * Created by CHENG Xiaojun et JIN Benli on 17/10/14.
 */

/**
 * Representation for a secretary
 * @constructor
 */
Secretary = function (firstName, lastName, address, pwd) {
    Person.call(this, firstName, lastName, address, pwd);
    this._type_of_person = "Secretary";
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

/**
 * Hierarchy from person
 * @type {Person}
 */
Secretary.prototype = new Person(this.firstName, this.lastName, this.address, this.pwd);

Secretary.prototype.equals = function (theperson) {
    return (this.type === theperson.type) && (this.firstName === theperson.firstName) && (this.lastName === theperson.lastName)
        && (this.address == theperson.address) && (this.pwd === theperson.pwd);
}

/**
 * A cast object helper, used by database object when retreating at beginning
 * @type {{createFromObject: Function}}
 */
SecretaryObjectHelper = {
    createFromObject: function (object) {
        var theSecretary = new Secretary(object.firstName, object.lastName, object.address, object.pwd);
        return theSecretary;
    }
}
