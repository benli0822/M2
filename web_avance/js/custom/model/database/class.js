/**
 * Created by benli on 08/10/14.
 */
classDB = function() {
    var _classList = [];
    // initialization for class database, normally only needed once
    init = function () {
        if (typeof(Storage) == "undefined") {
            // Sorry! No Web Storage support..
            alert("Your browser don't support local storage");
            return;
        }
        //init class List list in the DB
        localStorage.setItem('classList', JSON.stringify(classList));
    };
    // add a class into memory without charge local storage
    addClass = function (name, teacher, client, duration, startTime, date, type) {
        //create a class and save it to db
        switch (type) {
            case "Drive" :
            {
                //1. create the class locally
                var newDriveClass = new Class.DriveClass(name, duration, teacher, client, startTime, date);
                console.log("Adding " + teacher.name + "'s " + name + "'s " + type + " class" + "start from"
                    + startTime + "last for " + duration + "with " + client.name);
                //2. add the class to the temp list
                try{
                    _classList.push(newDriveClass);
                }
                catch(error) {
                    var errorElement = document.createElement("div");
                    errorElement.innerHTML = error.message;
                }
                break;
            }
            case "Lecture" :
            {
                // almost same thing
                var newLectureClass = new Class.LectureClass(name, duration, teacher, client, startTime, date);
                console.log("Adding " + teacher.name + "'s " + name + "'s " + type + " class" + "start from"
                    + startTime + "last for " + duration + "with " + client.name);
                try{
                    _classList.push(newLectureClass);
                }
                catch(error) {
                    var errorElement = document.createElement("div");
                    errorElement.innerHTML = error.message;
                }
                break;
            }
        }
    };
    //TODO removeClass need to be find by condition ex. {name: abc} {teacher: abc} condition should gived in detail

    this.__defineGetter__("classList", function(){
        return _classList;
    });

};
