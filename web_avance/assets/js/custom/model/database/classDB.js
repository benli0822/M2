/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */
ClassDB = function () {
    var _classList = [];

    if (localStorage.getItem('classList') != null) {
        var localClassList = JSON.parse(localStorage.getItem('classList'));
        for (var i = 0; i < localClassList.length; i++) {
            _classList.push(localClassList[i]);
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
ClassDB.prototype.addAClass = function (name, teacher, client, duration, startTime, date, type) {
    //create a class and save it to db
    switch (type) {
        case "drive" :
        {

            var teachername = teacher.split('.');
            var studentname = client.split('.');

            //1. create the class locally
            var newDriveClass = new Class.DriveClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher + "'s " + name + "'s " + type + " class" + " start from "
                + startTime + " last for " + duration + " with " + client);
            //2. add the class to the temp list
            try {
                this.classList.push(newDriveClass);
            }
            catch (error) {
                var errorElement1 = document.createElement("div");
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

                if(sdb.find_a_client_by_name(studentname[0],studentname[1])!= false){
                    sdb.find_a_client_by_name(studentname[0],studentname[1]).list_class.push(newDriveClass);
                       // client_result.addAClassToClient(newDriveClass);
                }

            }
            // add class info into teacher's database
            if (typeof(tdb) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                if(tdb.find_a_teacher_by_name(teachername[0],teachername[1])!= false){
                    var teacher_result = tdb.find_a_teacher_by_name(teachername[0],teachername[1]).list_class.push(newDriveClass);
                    //teacher_result.addAClassToTeacher(newDriveClass);
                }
            }
            break;
        }
        case "lecture" :
        {
            var teachername = teacher.split('.');
            var studentname = client.split('.');

            //1. create the class locally
            var newLectureClass = new Class.LectureClass(name, duration, teacher, client, startTime, date);
            console.log("Adding " + teacher + "'s " + name + "'s " + type + " class" + " start from "
                + startTime + " last for " + duration + " with " + client);
            //2. add the class to the temp list
            try {
                this.classList.push(newLectureClass);
            }
            catch (error) {
                var errorElement1 = document.createElement("div");
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

                if(sdb.find_a_client_by_name(studentname[0],studentname[1])!= false){
                    var student_result =sdb.find_a_client_by_name(studentname[0],studentname[1]).list_class.push(newLectureClass);
                        //student_result.addAClassToClient(newLectureClass);
                }

            }
            // add class info into teacher's database
            if (typeof(tdb) == "undefined") {
                // there should be an exception
                alert("Check teacher database js has already loaded!");
                return;
            } else {
                // find the teacher
                if(tdb.find_a_teacher_by_name(teachername[0],teachername[1])!= false){
                    var teacher_result = tdb.find_a_teacher_by_name(teachername[0],teachername[1]).list_class.push(newLectureClass);
                        //teacher_result.addAClassToTeacher(newLectureClass);
                }
            }
            break;
        }
    }
};

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
            localStorage.setItem("classList+", JSON.stringify(this.classList, function (key, val) {
                if (typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
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