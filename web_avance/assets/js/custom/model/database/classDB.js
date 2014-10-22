/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */
ClassDB = function () {
    var _classList = [];

    if (localStorage.getItem('classList') != null) {
        var localClassList = JSON.parse(localStorage.getItem('classList'));
        for (var i = 0; i < localClassList.length; i++) {
            var theClass;
            switch (localClassList[i].type) {
                case "drive" :
                    theClass = DriveClassObjectHelper.createFromObject(localClassList[i]);
                    break;
                case "lecture" :
                    theClass = LectureClassObjectHelper.createFromObject(localClassList[i]);
                    break;
            }
            if (!this.hasClass(theClass)) {
                console.log(theClass);
                _classList.push(theClass);
            }
        }
    }

    //TODO removeClass need to be find by condition ex. {name: abc} {teacher: abc} condition should gived in detail

    this.__defineGetter__("classList", function () {
        return _classList;
    });

};

// initialization for class database, normally only needed once
ClassDB.prototype.init = function () {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    //init class List list in the DB
    localStorage.setItem('classList', JSON.stringify(this.classList));
};


// add a class into memory without charge local storage
ClassDB.prototype.addAClass = function (name, teacher, client, duration, startTime, date, type, sdb, tdb) {
    //create a class and save it to db
    var teachername;
    var studentname;
    var errorElement1;
    switch (type) {
        case "drive" :
        {

            teachername = teacher.split('.');
            studentname = client.split('.');

            //1. create the class locally
            var newDriveClass = new DriveClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher + "'s " + name + "'s " + type + " class" + " start from "
                + startTime + " last for " + duration + " with " + client);
            //2. add the class to the temp list
            try {
                if (!this.hasClass(newDriveClass)) {
                    this.classList.push(newDriveClass);
                } else {
                    console.log('Error while adding class 1');
                    return;
                }
            }
            catch (error) {
                errorElement1 = document.createElement("div");
                errorElement1.innerHTML = error.message;
                document.getElementsByTagName("body").item[0].appendChild(errorElement1);
            }
            // add class info into student's database
            if (typeof(sdb) == "undefined") {
                // there should be an exception
                alert("Check student database js has already loaded!");
                return;
            } else {
                // find the client

                if (sdb.find_a_client_by_name(studentname[0], studentname[1])) {
                    var client_result = sdb.find_a_client_by_name(studentname[0], studentname[1]);
//                    client_result.list_class.push(newDriveClass);
                    client_result.addAClassToClient(newDriveClass);
                }

            }
            // add class info into teacher's database
            if (typeof(tdb) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                if (tdb.find_a_teacher_by_name(teachername[0], teachername[1])) {
                    var teacher_result = tdb.find_a_teacher_by_name(teachername[0], teachername[1]);
                    console.log(teacher_result);
                    teacher_result.addAClassToTeacher(newDriveClass);
                }
            }
            break;
        }
        case "lecture" :
        {
            teachername = teacher.split('.');
            studentname = client.split('.');

            //1. create the class locally
            var newLectureClass = new LectureClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher + "'s " + name + "'s " + type + " class" + " start from "
                + startTime + " last for " + duration + " with " + client);
            //2. add the class to the temp list
            try {
                if (!this.hasClass(newLectureClass)) {
                    this.classList.push(newLectureClass);
                } else {
                    console.log('Error while adding class 2');
                    return;
                }
            }
            catch (error) {
                errorElement1 = document.createElement("div");
                errorElement1.innerHTML = error.message;
                document.getElementsByTagName("body").item[0].appendChild(errorElement1);
            }
            // add class info into student's database
            if (typeof(sdb) == "undefined") {
                // there should be an exception
                alert("Check student database js has already loaded!");
                return;
            } else {
                // find the client

                if (sdb.find_a_client_by_name(studentname[0], studentname[1])) {
                    var student_result = sdb.find_a_client_by_name(studentname[0], studentname[1]);
                    student_result.addAClassToClient(newLectureClass);
                }

            }
            // add class info into teacher's database
            if (typeof(tdb) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                if (tdb.find_a_teacher_by_name(teachername[0], teachername[1])) {
                    var teacher_result = tdb.find_a_teacher_by_name(teachername[0], teachername[1]);
                    teacher_result.addAClassToTeacher(newLectureClass);
                }
            }
            break;
        }
    }
};

ClassDB.prototype.getClassById = function (id) {
    if (typeof(this.classList) != "undefined") {
        var _classList = this.classList;

        for (var i = 0; i < _classList.length; i++) {
            if (_classList[i].id === id) {
                return _classList[i];
            }
        }
        console.log('The class with id: ' + id + " does not exist!");
    } else {
        console.log('Class database not available!');
    }

};

// check a teacher's existence
ClassDB.prototype.hasClass = function (theClass) {
    if (typeof(this.classList) != 'undefined') {
        var _classList = this.classList;

        for (var i = 0; i < _classList.length; i++) {
            if (_classList[i].equals(theClass)) {
                return true;
            }
        }
        return false;
    }
    return false;
};

ClassDB.prototype.deleteClass = function (id) {

    // remove from teacher
    for (var i = 0; i < tdb.teacherList.length; i++) {
        var theTeacher = tdb.teacherList[i];
        for (var j = 0; j < theTeacher.list_class.length; j++) {
            if (theTeacher.list_class[j] === id) {
                theTeacher.list_class.splice(j, 1);
            }
        }
        // if there is no class, clear local storage
        if (theTeacher.list_class.length == 0) {
            var key = lwrapper.getPersonKey(theTeacher);
            localStorage.removeItem(key);
        }
    }

    // remove from student
    for (var i = 0; i < sdb.studentList.length; i++) {
        var theStudent = sdb.studentList[i];
        for (var j = 0; j < theStudent.list_class.length; j++) {
            if (theStudent.list_class[j] === id) {
                theStudent.list_class.splice(j, 1);
            }
        }

        // if there is no class, clear local storage
        if (theStudent.list_class.length == 0) {
            var key = lwrapper.getPersonKey(theStudent);
            localStorage.removeItem(key);
        }
    }


    for (var i = 0; i < this.classList.length; i++) {
        var theClass = this.classList[i];
        if (theClass.id == id) {
            this.classList.splice(i, 1);
        }
    }

    console.log('class ' + id + " deleted");

}

// close database operation, 1 for local storage, 0 for abandon memory change
ClassDB.prototype.close = function (option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch (option) {
        case 1 :
        {
            var seen = [];
            // if the studentList haven't been initialised
            localStorage.setItem("classList", JSON.stringify(this.classList, function (key, val) {
                if (typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return;
                    seen.push(val)
                }
                return val
            }));


            //localStorage.setItem("classList", JSON.stringify(this.classList));

            break;
        }
        case 0 :
        {
            console.log("You have requested to discard class's changes of this time");
            break;
        }
    }
};