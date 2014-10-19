/**
 * Created by benli on 15/10/14.
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

