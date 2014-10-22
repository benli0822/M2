/**
 * Created by CHENG Xiaojun et JIN Benli on 21/10/14.
 *
 *
 */
/**
 *
 * warpper function , give a person's class key to a person
 */

LocalStorageWrapper = function () {
};

/**
 *
 * @param person can be student or teacher
 * @returns {string} person class list key
 */
LocalStorageWrapper.prototype.getPersonKey = function (person) {
    var key = person.firstName + "" + person.lastName + "" + person.address;
    return key;
}