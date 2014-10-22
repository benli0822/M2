/**
 * Created by CHENG Xiaojun et JIN Benli on 17/10/14.
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

Client.prototype.hasClass = function (id) {
    return this.list_class.indexOf(id);
}

Client.prototype.hasClassAlready = function (time) {
    for (var i = 0; i < this.list_class.length; i++) {
        console.log(time);
        console.log(this.list_class[i].contains(time));
        if (this.list_class[i].contains(time)) {
            return true;
        }
    }
    return false;
}

Client.prototype.deleteClass = function (id) {

    // remove from student
    for (var j = 0; j < this.list_class.length; j++) {
        if (this.list_class[j] === id) {
            this.list_class.splice(j, 1);
        }
    }

    // if there is no class, clear local storage
    if (this.list_class.length == 0) {
        var key = lwrapper.getPersonKey(this);
        localStorage.removeItem(key);
    }

    console.log('class ' + id + " deleted from " + this.say());

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
