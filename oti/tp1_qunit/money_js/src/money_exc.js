function DevisesIncompatibleExc(_d1, _d2) {
    this.d1 = _d1;
    this.d2 = _d2;

}

DevisesIncompatibleExc.prototype.toString = function () {
    return "Devises incompatibles : " + d1 + " vs " + d2;
}

function UnexistingCurrencyExc(_curr) {
    this.curr = _curr;
}

UnexistingCurrencyExc.prototype.toString = function () {
    return "Currency " + curr + " is unknown !"
}

function SubtrationImpossibleExc(_v1, _v2) {
    this.v1 = _v1;
    this.v2 = _v2;
}

SubtrationImpossibleExc.prototype.toString = function() {
    return _v1 + " sub " + _v2 + " impossible";
}
