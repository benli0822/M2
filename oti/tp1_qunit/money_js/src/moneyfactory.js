/**
 * Created by benli on 20/10/14.
 */
function moneyEUR(options) {
    this.v = options.v * options.currValue;
    this.currValue = options.currValue;
    this.curr = options.curr;

}


function moneyCHF(options) {
    this.v = options.v / options.currValue;
    this.currValue = options.currValue;
    this.curr = options.curr;
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
            throw new UnexistingCurrencyExc();
    }

    return new this.moneyClass(options);

};


moneyEUR.prototype = new money(this.v * this.currValue , this.curr);
moneyCHF.prototype = new money(this.v * this.currValue , this.curr);


moneyEUR.prototype.equals =
    function (other) {
        if (typeof(other) == "undefined") {
            return false;
        }
        if(other instanceof moneyEUR) {
            return (other.getValue() == this.getValue());
        } else if (other instanceof moneyCHF) {
            return other.__proto__.__proto__.equals(this);
        } else if (other instanceof money) {
            return other.equals(this);
        }
    };

moneyCHF.prototype.equals =
    function (other) {
        if (typeof(other) == "undefined") {
            return false;
        }
        if(other instanceof moneyCHF) {
            return (other.getValue() == this.getValue());
        } else if (other instanceof moneyEUR) {
            return other.__proto__.__proto__.equals(this);
        } else if (other instanceof money) {
            return other.equals(this);
        }
    };