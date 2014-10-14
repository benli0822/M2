/**
 * Created by benli on 13/10/14.
 */
var fabrique = function() {
    var _defaultInstance;
    var currencies = [];

    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;


};

fabrique.prototype.constructor =
    function(currencies) {
        this.currencies = this.currencies.concat(currencies);
    };

fabrique.prototype.defaultInstance =
    Money()

