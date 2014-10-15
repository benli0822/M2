/**
 * Created by benli on 15/10/14.
 */

SecretaryDB = function () {
    var _secretaryList = [];

    this.__defineGetter__('secretaryList', function () {
        return _secretaryList;
    });
};

SecretaryDB.prototype.init = function () {

};

