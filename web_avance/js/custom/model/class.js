/**
 * Created by benli on 08/10/14.
 */
/**
 * Class representation for class
 * @param name
 * @param teacher
 * @param duration
 * @param client
 * @param startTime
 * @param date
 * @constructor
 */
Class = function (name, teacher, duration, client, startTime, date) {
    this._name = name; // class's name
    this._teacher = teacher;
    this._duration = duration;
    this._client = client;
    this._startTime = startTime;
    this._date = date;
    /* getter and setter for name */
    this.__defineGetter__("name", function () {
        return this._name;
    });
    this.__defineSetter__("name", function (value) {
        return this._name = value;
    });

    /* getter and setter for teacher */
    this.__defineGetter__("teacher", function () {
        return this._teacher;
    });
    this.__defineSetter__("teacher", function (value) {
        return this._name = value;
    });

    /* getter and setter for duration */
    this.__defineGetter__("duration", function () {
        return this._duration;
    });
    this.__defineSetter__("duration", function (value) {
        return this._duration = value;
    });

    /* getter and setter for client */
    this.__defineGetter__("client", function () {
        return this._client;
    });
    this.__defineSetter__("client", function (value) {
        return this._client = value;
    });

    /* getter and setter for startTime */
    this.__defineGetter__("startTime", function () {
        return this._startTime;
    });
    this.__defineSetter__("startTime", function (value) {
        return this._startTime = value;
    })

    /* getter and setter for date */
    this.__defineGetter__("date", function () {
        return this._date;
    });
    this.__defineSetter__("date", function (value) {
        return this._date = value;
    })
}

/**
 * Prototype for class
 * @type {{name: string, type: string, day_date: string, duration: string, teacher: {}, client: {}, startTime: string}}
 */
Class.prototype = {
    _name: "",
    _type: "",
    _date: "",
    _duration: "",
    _teacher: {},
    _client: {},
    _startTime: ""
}

/**
 * A representation for drive class
 * @param name
 * @param duration
 * @param teacher
 * @param client
 * @param startTime
 * @param day_date
 * @constructor
 */
Class.DriveClass = function (name, duration, teacher, client, startTime, date) {
    Class.call(this, name, teacher, duration, client, startTime, date);
    this._type = "Drive";

    this.__defineGetter__("type", function() {
        return this._type;
    });
    this.__defineSetter__("type", function(value) {
        return this._type = value;
    })

}

/**
 * A representation for lecture class
 * @param name
 * @constructor
 */
Class.LectureClass = function (name, duration, teacher, client, startTime, date) {
    Class.call(this, name, teacher, duration, client, startTime, date);
    this.type = "Lecture";

    this.__defineGetter__("type", function() {
        return this._type;
    });
    this.__defineSetter__("type", function(value) {
        return this._type = value;
    })
}