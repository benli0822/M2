/**
 * Created by jamesRMBP on 21/10/14.
 */

LocalStorageWrapper = function () {};

LocalStorageWrapper.prototype.getPersonKey = function(person){
    var key = person.firstName + "" + person.lastName + "" + person.address;
    return key;
}