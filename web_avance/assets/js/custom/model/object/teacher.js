/**
 * Created by jamesRMBP on 17/10/14.
 */
/**
 * Representation for a teacher
 * @param firstName
 * @param lastName
 * @param address
 * @constructor
 */
Teacher = function (firstName, lastName, address,pwd) {

    Person.call(this, firstName, lastName, address, pwd);
    this._type_of_person = "Teacher";
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

Teacher.prototype.equals = function (theperson) {
    return (this.type === theperson.type) && this.equals(theperson);
}
Teacher.prototype.addAClassToTeacher = function (the_class){
    this.list_class.push(the_class);
}
