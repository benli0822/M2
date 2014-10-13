function DevisesIncompatibleExc(_d1, _d2) {
    this.d1 = _d1;
    this.d2 = _d2;

}

DevisesIncompatibleExc.prototype.toString = function () {
    return "Devises incompatibles : " + d1 + " vs " + d2;
}