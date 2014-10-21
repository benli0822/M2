/**
 * Created by CHENG Xiaojun et JIN Benli on 09/10/14.
 */
StudentDB = function () {
    var _studentList = [];

    if (localStorage.getItem('studentList') != null) {
        var localStudentList = JSON.parse(localStorage.getItem('studentList'));
        for (var i = 0; i < localStudentList.length; i++) {
            var theStudent = ClientObjectHelper.createFromObject(localStudentList[i]);
            if (!this.hasStudent(theStudent)) {
                _studentList.push(theStudent);
            }
        }
    }

    //TODO removeStudent

    this.__defineGetter__("studentList", function () {
        return _studentList;
    });

};

// initialization for student database, normally only needed once
StudentDB.prototype.init = function () {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    // init studentList list in the DB
    localStorage.setItem('studentList', JSON.stringify(this.studentList));
};

// add a student into memory without charge local storage
StudentDB.prototype.addStudent = function (firstName, lastName, address, pwd) {
    // create a student and save it to db
    var newStudent = new Client(firstName, lastName, address, pwd);
    console.log("Adding student:" + firstName + " " + lastName +
        " who live in " + address);
    // add the student into temp list
    try {
        if (!this.hasStudent(newStudent)) {
            console.log("Adding new student");
            this.studentList.push(newStudent);
        }
    }
    catch (error) {
        var errorElement1 = document.createElement("div");
        errorElement1.innerHTML = error.message;
        document.getElementsByTagName("body").item[0].appendChild(errorElement1);
    }
};

// add a student object into memory
StudentDB.prototype.addStudentObject = function (student) {
    if (!this.hasStudent(student)) {
        this.studentList.push(student);
    }
};

function compare(a, b) {

    tempA = cdb.getClassById(a).date.valueOf();
    tempB = cdb.getClassById(b).date.valueOf();


    if (tempA < tempB)
        return -1;
    if (tempA > tempB)
        return 1;
    return 0;
}

StudentDB.prototype.sortClasslist = function (student) {
    student.list_class.sort(compare);
    console.log(student.list_class);
}


StudentDB.prototype.find_a_client_by_name = function (firstname, lastname) {
    //1.get the client list
    var clientlistobject = this.studentList;

    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {
        if (clientlistobject[i].firstName == firstname && clientlistobject[i].lastName == lastname) {
            //we have find the teacher add the class to this client
            console.log("find the client " + firstname);
            return clientlistobject[i];
        }

    }
    return false;

};


StudentDB.prototype.student_login = function (firstname, lastname, password) {
    //1.get the client list
    var clientlistobject = this.studentList;

    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {

        if (clientlistobject[i].firstName == firstname && clientlistobject[i].lastName == lastname && clientlistobject[i].pwd == password) {
            return true;
        }
    }

    return false;
};

StudentDB.prototype.find_a_client_by_firstname = function (firstname) {
    //1.get the client list
    var clientlistobject = this.studentList;

    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {
        if (clientlistobject[i].firstName == firstname) {
            //we have find the teacher add the class to this client
            //console.log("find the client" + firstname);
            return clientlistobject[i];
        }
    }
};


// check a student's existence
StudentDB.prototype.hasStudent = function (student) {
    if (typeof(this.studentList) != 'undefined') {
        var _studentList = this.studentList;

        for (var i = 0; i < _studentList.length; i++) {
            if (_studentList[i].equals(student)) {
                return true;
            }
        }
    }
    return false;
};


// close database operation, 1 for local storage, 0 for abandon memory change
StudentDB.prototype.close = function (option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch (option) {
        case 1 :
        {
            var seen = [];
            localStorage.setItem("studentList", JSON.stringify(this.studentList, function (key, val) {
                if (typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
                    seen.push(val)
                }
                return val
            }));
            for (var i = 0; i < this.studentList.length; i++) {
                var theStudent = this.studentList[i];
                if (theStudent.list_class.length != 0) {
                    //var key = theStudent.firstName + "" + theStudent.lastName + "" + theStudent.address;
                    var key = lwrapper.getPersonKey(theStudent);
                    console.log(theStudent.list_class);
                    localStorage.setItem(key, JSON.stringify(theStudent.list_class));
                }
            }
            break;
        }
        case 0 :
        {
            console.log("You have requested to discard student's changes of this time");
            break;
        }
    }
};