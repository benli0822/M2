/**
 * Created by CHENG Xiaojun et JIN Benli on 21/10/14.
 */

LocalStorageWrapper = function () {
};

LocalStorageWrapper.prototype.getPersonKey = function (person) {
    var key = person.firstName + "" + person.lastName + "" + person.address;
    return key;
}