/**
 * Created by jamesRMBP on 17/10/14.
 */

/**
 * Representation for a secretary
 * @constructor
 */
Person.Secretary = function (firstName, lastName, address,pwd) {
    Person.call(this, firstName, lastName, address,pwd);
    this._type_of_person = "Secretary";
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

Person.Secretary.prototype.equals = function (theperson) {
    return (this.type === theperson.type) && this.equals(theperson);
}
