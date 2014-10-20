/**
 * Created by benli on 20/10/14.
 */
function moneyEUR(options) {
    this.v = options.v;
    this.curr = options.curr;
    money.call(this.v, this.curr);
}


function moneyCHF(options) {
    this.v = options.v / 1.2;
    this.curr = options.curr;
    money.call(this.v, this.curr);
}


function MoneyFactory() {
}
//default money type
MoneyFactory.prototype.moneyClass = moneyEUR;

MoneyFactory.prototype.createMoney = function (options) {
    switch (options.curr) {
        case "EUR":
            this.moneyClass = moneyEUR;
            break;
        case "CHF":
            this.moneyClass = moneyCHF;
            break;
        default:
            throw new UnexistingCurrencyExc(options.curr);
    }

    return new this.moneyClass(options);

};

moneyEUR.prototype.getCurrency =
    function () {
        return this.curr;
    };

moneyEUR.prototype.getValue =
    function () {
        return this.v;
    };

moneyEUR.prototype.equals =
    function (otherM) {
        if (typeof(otherM) == "undefined") {
            return false;
        }
        return (otherM.getValue() == this.getValue() &&
            otherM.getCurrency().toLowerCase() === this.getCurrency().toLowerCase());
    };

moneyEUR.prototype.toString =
    function () {
        return this.getValue() + " (" + this.getCurrency() + ")";
    };

moneyCHF.prototype.getCurrency =
    function () {
        return this.curr;
    };

moneyCHF.prototype.getValue =
    function () {
        return this.v;
    };

moneyCHF.prototype.equals =
    function (otherM) {
        if (typeof(otherM) == "undefined") {
            return false;
        }
        return (otherM.getValue() == this.getValue() &&
            otherM.getCurrency().toLowerCase() === this.getCurrency().toLowerCase());
    };

moneyCHF.prototype.toString =
    function () {
        return this.getValue() + " (" + this.getCurrency() + ")";
    };