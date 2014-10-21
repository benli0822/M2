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
Client = function (firstName, lastName, address, pwd) {
    Person.call(this, firstName, lastName, address, pwd);
    this._type_of_person = "Client";
    /* getter and setter for type_of_person */
    this.__defineGetter__("type_of_person", function () {
        return this._type_of_person;
    });
    this.__defineSetter__("type_of_person", function (value) {
        return this._type_of_person = value;
    });
}

Client.prototype.equals = function (theperson) {
    return (this.type === theperson.type) && (this.firstName === theperson.firstName) && (this.lastName === theperson.lastName)
        && (this.address == theperson.address) && (this.pwd === theperson.pwd);
}

Client.prototype.addAClassToClient = function (the_class) {
    this.list_class.push(the_class.id);
}

ClientObjectHelper = {
    createFromObject: function (object) {
        var theClient = new Client(object.firstName, object.lastName, object.address, object.pwd);
        //var key = theClient.firstName + "" + theClient.lastName + "" + theClient.address;
        var key = lwrapper.getPersonKey(theClient);
        var list_class = JSON.parse(localStorage.getItem(key));
        if (list_class != 'undefined' && list_class != null) {
            for (var i = 0; i < list_class.length; i++) {
                console.log(list_class[i]);
                theClient.list_class.push(list_class[i]);
            }
        }
        return theClient;
    }
}
