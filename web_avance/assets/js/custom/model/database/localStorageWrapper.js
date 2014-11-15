/**
 * Created by CHENG Xiaojun et JIN Benli on 21/10/14.
 *
 *
 */
/**
 *
 * wrapper function , serving for person's class list storage, generate a key that we store with the class list in local
 * storage
 */

LocalStorageWrapper = function () {
};

/**
 * Generate a key with a person's own information
 * @param person can be student or teacher
 * @returns {string} person class list key
 */
//noinspection UnterminatedStatementJS
LocalStorageWrapper.prototype.getPersonKey = function (person)
{
    //noinspection UnnecessaryLocalVariableJS
    var key = person.firstName + "" + person.lastName + "" + person.address;
    return key;
};