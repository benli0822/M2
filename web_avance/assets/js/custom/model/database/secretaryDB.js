/**
 * Created by CHENG Xiaojun et JIN Benli on 15/10/14.
 */

SecretaryDB = function () {
    var _secretaryList = [];

    if (localStorage.getItem('secretaryList') != null) {
        _secretaryList = _secretaryList.concat(JSON.parse(localStorage.getItem('secretaryList')));

    }

    this.__defineGetter__('secretaryList', function () {
        return _secretaryList;
    });
};

SecretaryDB.prototype.init = function () {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    // init secretary list in the db
    localStorage.setItem('secretaryList', JSON.stringify(this.secretaryList));
};


// add a Secretary into memory without charge local storage
SecretaryDB.prototype.addSecretary = function (firstName, lastName, address,pwd) {
    // create a Secretary and save it to db
    var newSecretary = new Person.Secretary(firstName, lastName, address,pwd);
    console.log("Adding Secretary:" + firstName + " " + lastName +
        " who live in " + address);
    // add the Secretary into temp list
    try{
        this.secretaryList.push(newSecretary);
    }
    catch(error) {
        var errorElement1 = document.createElement("div");
        errorElement1.innerHTML = error.message;
        document.getElementsByTagName("body").item[0].appendChild(errorElement1);
    }
};

//check the existance of a secretary
SecretaryDB.prototype.login_secretary = function(firstname, lastname,password) {
    //1.get the secretary list
    var secretarylistobject = this.secretaryList;

    //Traverse in the secretary list to find the secretary
    for(var i = 0; i <= secretarylistobject.length -1 ; i++){
        if(secretarylistobject[i].firstName == firstname && secretarylistobject[i].lastName == lastname,secretarylistobject[i].pwd = password ){
            return true;
        }
    }

    return false;
};
/**
 * Login validation
 * @param firstName
 * @param lastName
 * @returns {boolean}
 */
SecretaryDB.prototype.validate = function (firstName, lastName) {
    if (localStorage.getItem('secretaryList') != null) {
        var _sl = JSON.parse(localStorage.getItem('secretaryList'));
        for (var i = 0; i < _sl.length; i++) {
            if (_sl[i].firstName === firstName && _sl[i].lastName === lastName) {
                return true;
            }
        }
    }
    for (var j = 0; j < this.secretaryList.length; j++) {
        if (this.secretaryList[i].firstName === firstName && this.secretaryList[i].lastName === lastName) {
            return true;
        }
    }

    return false;
}
// close database operation, 1 for local storage, 0 for abandon memory change
SecretaryDB.prototype.close = function(option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch(option) {
        case 1 : {
            // if the studentList haven't been initialised
            if(localStorage.getItem("secretaryList") === null) {
                localStorage.setItem("secretaryList", this.secretaryList);
            } else {
                var tempSecretaryList =  localStorage.getItem("secretaryList");
                // concatenate the current to the exist one
                var finalSecretaryList = tempSecretaryList.concat(this.secretaryList);
                localStorage.setItem("secretaryList", finalSecretaryList);
            }
            break;
        }
        case 0 : {
            console.log("You have requested to discard secretary's changes of this time");
            break;
        }
    }
};
