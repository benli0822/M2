/**
 * Created by jamesRMBP on 17/10/14.
 */
/**
 * Representation of a client
 * @param firstName
 * @param lastName
 * @param address
 * @param freeTime
 * @constructor
 */
Person.Client = function (firstName, lastName, address,pwd) {
    Person.call(this, firstName, lastName, address,pwd);
    this._type_of_person = "Client";
    /* getter and setter for type_of_person */
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

Person.Client.prototype.equals = function (theperson) {
    return (this.type === theperson.type) && this.equals(theperson);
}
