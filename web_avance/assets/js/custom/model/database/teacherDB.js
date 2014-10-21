/**
 * Created by CHENG Xiaojun et JIN Benli on 09/10/14.
 */
TeacherDB = function () {
    var _teacherList = [];

    if (localStorage.getItem('teacherList') != null) {
        var localTeacherList = JSON.parse(localStorage.getItem('teacherList'));
        for (var i = 0; i < localTeacherList.length; i++) {
            var theTeacher = TeacherObjectHelper.createFromObject(localTeacherList[i]);
            if (!this.hasTeacher(theTeacher)) {
                _teacherList.push(theTeacher);
            }
        }
    }

    //TODO removeTeacher need to be done

    this.__defineGetter__("teacherList", function () {
        return _teacherList;
    })
};

TeacherDB.prototype.init = function () {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    //init _teacherList list in the DB
    localStorage.setItem('teacherList', JSON.stringify(this.teacherList));
};

// add a teacher into memory without charge local sotrage
TeacherDB.prototype.addTeacher = function (firstName, lastName, address, pwd) {
    // create a teacher and save it into dbs
    var newTeacher = new Teacher(firstName, lastName, address, pwd);
    console.log("Adding " + firstName + " " + lastName + " lived in: " + address);
    // add the class into temp list
    try {
        if (!this.hasTeacher(newTeacher)) {
            this.teacherList.push(newTeacher);
        }
    }
    catch (error) {
        var errorElement1 = document.createElement("div");
        errorElement1.innerHTML = error.message;
        document.getElementsByTagName("body").item[0].appendChild(errorElement1);
    }
};

// add a teacher object into memory
TeacherDB.prototype.addTeacherObject = function (teacher) {
    if (!this.hasTeacher(teacher)) {
        this.teacherList.push(teacher);
    }
};

TeacherDB.prototype.find_a_teacher_by_name = function (firstname, lastname) {
    //1.get the teacher list
    var _teacherList = this.teacherList;

    //Traverse in the teacher list to find the teacher
    for (var i = 0; i <= _teacherList.length - 1; i++) {
        if (_teacherList[i].firstName == firstname && _teacherList[i].lastName == lastname) {
            //we have find the teacher add the class to this teacher
            //console.log("find the teacher" + firstname);
            return _teacherList[i];
        }
    }
    return false;
};

// check a teacher's existence
TeacherDB.prototype.hasTeacher = function (teacher) {
    if (typeof(this.teacherList) != 'undefined') {
        var _teacherList = this.teacherList;

        for (var i = 0; i < _teacherList.length; i++) {
            if (_teacherList[i].equals(teacher)) {
                return true;
            }
        }
    }
    return false;
};

// close database operation, 1 for local storage, 0 for abandon memory change
TeacherDB.prototype.close = function (option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch (option) {
        case 1 :
        {
            var seen = [];
            localStorage.setItem("teacherList", JSON.stringify(this.teacherList, function (key, val) {
                if (typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
                    seen.push(val)
                }
                return val
            }));
            for (var i = 0; i < this.teacherList.length; i++) {
                var theTeacher = this.teacherList[i];
                if (theTeacher.list_class.length != 0) {
                    var key = lwrapper.getPersonKey(theTeacher);

                    console.log(theTeacher.list_class);
                    localStorage.setItem(key, JSON.stringify(theTeacher.list_class));
                }
            }
            break;

            //localStorage.setItem("teacherList", JSON.stringify(this.teacherList));
        }
        case 0 :
        {
            console.log("You have requested to discard teacher's changes of this time");
            break;
        }
    }
};