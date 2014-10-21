/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
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
    this._id = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "." + date.getHours() +
        "." + teacher;
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

    /* getter for id */
    this.__defineGetter__("id", function () {
        return this._id;
    })
}


Class.prototype.equals = function (theclass) {
    return this.id === theclass.id;
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
//TODO drive class should be one teacher with one student
DriveClass = function (name, duration, teacher, client, startTime, date) {
    Class.call(this, name, teacher, duration, client, startTime, date);
    this._type = "drive";

    this.__defineGetter__("type", function () {
        return this._type;
    });
    this.__defineSetter__("type", function (value) {
        return this._type = value;
    })
}

DriveClass.prototype.equals = function (theclass) {
    return this.id === theclass.id;
}

DriveClassObjectHelper = {
    createFromObject: function (object) {
        var theDriveClass = new DriveClass(object.name, object.duration, object.teacher, object.client, object.startTime, new Date(object.date));
        return theDriveClass;
    }
}

/**
 * A representation for lecture class
 * @param name
 * @constructor
 */
// TODO lecture class should be one teacher with multiple students, should we consider the max number of a class?
LectureClass = function (name, duration, teacher, client, startTime, date) {
    Class.call(this, name, teacher, duration, client, startTime, date);
    this._type = "lecture";

    this.__defineGetter__("type", function () {
        return this._type;
    });
    this.__defineSetter__("type", function (value) {
        return this._type = value;
    })
}

LectureClass.prototype.equals = function (theclass) {
    return this.id === theclass.id;
}

LectureClassObjectHelper = {
    createFromObject: function (object) {
        var theLectureClass = new LectureClass(object.name, object.duration, object.teacher, object.client, object.startTime, new Date(object.date));
        return theLectureClass;
    }
}

