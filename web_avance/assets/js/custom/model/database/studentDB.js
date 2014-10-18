/**
 * Created by CHENG Xiaojun et JIN Benli on 09/10/14.
 */
StudentDB = function() {
    var _studentList = [];

    //TODO removeStudent

    this.__defineGetter__("studentList", function() {
        if (localStorage.getItem('studentList') != null) {
            _studentList = _studentList.concat(JSON.parse(localStorage.getItem('studentList')));
        }
        return _studentList;
    });

};

// initialization for student database, normally only needed once
StudentDB.prototype.init = function() {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    // init studentList list in the DB
    localStorage.setItem('studentList', JSON.stringify(this.studentList));
};

// add a student into memory without charge local storage
StudentDB.prototype.addStudent = function (firstName, lastName, address,pwd) {
    // create a student and save it to db
    var newStudent = new Person.Client(firstName, lastName, address,pwd);
    console.log("Adding student:" + firstName + " " + lastName +
        " who live in " + address);
    // add the student into temp list
    try{
        this.studentList.push(newStudent);
    }
    catch(error) {
        var errorElement1 = document.createElement("div");
        errorElement1.innerHTML = error.message;
        document.getElementsByTagName("body").item[0].appendChild(errorElement1);
    }
};

// add a student object into memory
StudentDB.prototype.addStudentObject = function (student) {
    this.studentList.push(student);
};

StudentDB.prototype.find_a_client_by_name = function(firstname, lastname) {
    //1.get the client list
    var clientlistobject = this.studentList;

    if(localStorage.getItem('studentList') != null) {
        clientlistobject = clientlistobject.concat(JSON.parse(localStorage.getItem('studentList')));
    }

    //Traverse in the client list to find the client
    for(var i = 0; i <= clientlistobject.length -1 ; i++){
        if(clientlistobject[i].firstName == firstname && clientlistobject[i].lastName == lastname ){
            //we have find the teacher add the class to this client
            console.log("find the client " + firstname);
            return clientlistobject[i];
        }
    }
};

StudentDB.prototype.find_a_client_by_firstname = function(firstname) {
    //1.get the client list
    var clientlistobject = this.studentList;

    if(localStorage.getItem('studentList') != null) {
        clientlistobject = clientlistobject.concat(JSON.parse(localStorage.getItem('studentList')));
    }

    //Traverse in the client list to find the client
    for(var i = 0; i <= clientlistobject.length -1 ; i++){
        if(clientlistobject[i].firstName == firstname ){
            //we have find the teacher add the class to this client
            //console.log("find the client" + firstname);
            return clientlistobject[i];
        }
    }
};

// check a teacher's existence
StudentDB.prototype.hasStudent = function(student) {
    var _studentList = this.studentList;

    if(localStorage.getItem('studentList') != null) {
        _studentList = _studentList.concat(JSON.parse(localStorage.getItem('studentList')));
    }

    for(var i = 0; _studentList.length; i++) {
        if(_studentList[i] === student) {
            return true;
        }
    }
    return false;
};

// close database operation, 1 for local storage, 0 for abandon memory change
StudentDB.prototype.close = function(option) {
    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }
    switch(option) {
        case 1 : {
            // if the studentList haven't been initialised
            if(localStorage.getItem("studentList") === null) {
                localStorage.setItem("studentList", StudentDB.studentList);
            } else {
                var tempStudentList =  localStorage.getItem("studentList");
                // concatenate the current to the exist one
                var finalStudentList = tempStudentList.concat(this.studentList);
                localStorage.setItem("studentList", finalStudentList);
            }
            break;
        }
        case 0 : {
            console.log("You have requested to discard student's changes of this time");
            break;
        }
    }
};