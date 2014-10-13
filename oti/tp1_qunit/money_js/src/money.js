var money = function (v, curr) {
    this.v = v;
    this.curr = curr;
}

money.prototype.getCurrency =
    function () {
        return this.curr;
    };

money.prototype.getValue =
    function () {
        return this.v;
    };

/**
 * Add currency comparison
 * @param otherM
 * @returns {boolean}
 */
money.prototype.equals =
    function (otherM) {
        if (typeof(otherM) == "undefined") {
            return false;
        }
        return (otherM.getValue() == this.getValue() &&
            otherM.getCurrency().toLowerCase() === this.getCurrency().toLowerCase());
    };

money.prototype.toString =
    function () {
        return this.getValue() + " (" + this.getCurrency() + ")";
    };