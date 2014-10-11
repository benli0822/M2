/**
 * Created by benli on 09/10/14.
 */
teacherDB = function () {
    var _teacherList = [];
    init = function () {
        if (typeof(Storage) == "undefined") {
            // Sorry! No Web Storage support..
            alert("Your browser don't support local storage");
            return;
        }
        //init _teacherList list in the DB
        localStorage.setItem('teacherList', JSON.stringify(_teacherList));
    };
    // add a teacher into memory without charge local sotrage
    addTeacher = function (firstName, lastName, address) {
        // create a teacher and save it into db
        var newTeacher = new Person.Teacher(firstName, lastName, address);
        console.log("Adding " + firstName + " " + lastName + " lived in: " + address);
        // add the class into temp list
        try {
            _teacherList.push(newTeacher);
        }
        catch (error) {
            var errorElement1 = document.createElement("div");
            errorElement1.innerHTML = error.message;
            document.getElementsByTagName("body").item[0].appendChild(errorElement1);
        }
    };

    find_a_teacher_by_name = function(firstname, lastname) {
        //1.get the teacher list
        var teacherlistData = localStorage.getItem('teacherList');
        var teacherlistobject = JSON.parse(teacherlistData);



        //Traverse in the teacher list to find the teacher
        for(var i = 0; i <= teacherlistobject.length -1 ; i++){
            if(teacherlistobject[i].firstName == firstname && teacherlistobject[i].lastName == lastname ){
                //we have find the teacher add the class to this teacher
                //console.log("find the teacher" + firstname);
                return teacherlistobject[i];
            }
        }
    };

    //TODO removeTeacher need to be done

    this.__defineGetter__("teacherList", function () {
        return _teacherList;
    })
}