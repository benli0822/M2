/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */
classDB = function () {
    var _classList = [];

    //TODO removeClass need to be find by condition ex. {name: abc} {teacher: abc} condition should gived in detail

    this.__defineGetter__("classList", function () {
        return _classList;
    });

};

// initialization for class database, normally only needed once
classDB.init = function () {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    //init class List list in the DB
    localStorage.setItem('classList', JSON.stringify(_classList));
};


// add a class into memory without charge local storage
classDB.addAClass = function (name, teacher, client, duration, startTime, date, type) {
    //create a class and save it to db
    switch (type) {
        case "Drive" :
        {
            //1. create the class locally
            var newDriveClass = new Class.DriveClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher.name + "'s " + name + "'s " + type + " class" + "start from"
                + startTime + "last for " + duration + "with " + client.name);
            //2. add the class to the temp list
            try {
                _classList.push(newDriveClass);
            }
            catch (error) {
                var errorElement1 = document.createElement("div");
                errorElement1.innerHTML = error.message;
                document.getElementsByTagName("body").item[0].appendChild(errorElement1);
            }
            // add class info into student's database
            if(typeof(studentDB) == "undefined") {
                // there should be an exception
                alert("Check student database js has already loaded!");
                return;
            } else {
                // find the client
                var _studentList = studentDB.studentList;
                for(var i = 0; i < _studentList.length; i++) {
                    if(_studentList[i] === client) {
                        // add the class into student's class list
                        _studentList[i].list_class.push(newDriveClass);
                    }
                }
            }
            // add class info into teacher's database
            if(typeof(teacherDB) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                var _teacherList = teacherDB.teacherList;
                for(var i = 0; i < _teacherList.length; i++) {
                    if(_teacherList[i] == teacher) {
                        // add the class info teacher's class list
                        _teacherList[i].list_class.push(newDriveClass);
                    }
                }
            }
            break;
        }
        case "Lecture" :
        {
            // almost same thing
            var newLectureClass = new Class.LectureClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher.name + "'s " + name + "'s " + type + " class" + "start from"
                + startTime + "last for " + duration + "with " + client.name);
            try {
                _classList.push(newLectureClass);
            }
            catch (error) {
                var errorElement2 = document.createElement("div");
                errorElement2.innerHTML = error.message;
                document.getElementsByTagName("body").item[0].appendChild(errorElement2);
            }
            // add class info into student's database
            if(typeof(studentDB) == "undefined") {
                // there should be an exception
                alert("Check student database js has already loaded!");
                return;
            } else {
                // find the client
                var _studentList = studentDB.studentList;
                for(var i = 0; i < _studentList.length; i++) {
                    if(_studentList[i] === client) {
                        // add the class into student's class list
                        _studentList[i].list_class.push(newDriveClass);
                    }
                }
            }
            // add class info into teacher's database
            if(typeof(teacherDB) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                var _teacherList = teacherDB.teacherList;
                for(var i = 0; i < _teacherList.length; i++) {
                    if(_teacherList[i] == teacher) {
                        // add the class info teacher's class list
                        _teacherList[i].list_class.push(newDriveClass);
                    }
                }
            }
            break;
        }
    }
};

// close database operation, 1 for local storage, 0 for abandon memory change
teacherDB.close = function(option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch(option) {
        case 1 : {
            // if the studentList haven't been initialised
            if(localStorage.getItem("teacherList") === null) {
                localStorage.setItem("teacherList", teacherDB.teacherList);
            } else {
                var tempTeacherList =  localStorage.getItem("teacherList");
                // concatenate the current to the exist one
                var finalTeacherList = tempTeacherList.concat(teacherDB.teacherList);
                localStorage.setItem("teacherList", finalTeacherList);
            }
            break;
        }
        case 0 : {
            console.log("You have requested to discard teacher's changes of this time");
            break;
        }
    }
};