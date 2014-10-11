/**
 * Created by benli on 09/10/14.
 */
studentDB = function() {
    var _studentList = [];
    // initialization for student database, normally only needed once
    init = function() {
        if (typeof(Storage) == "undefined") {
            // Sorry! No Web Storage support..
            alert("Your browser don't support local storage");
            return;
        }
        // init studentList list in the DB
        localStorage.setItem('studentList', JSON.stringify(_studentList));
    };
    // add a student into memory without charge local storage
    addStudent = function (firstName, lastName, address) {
        // create a student and save it to db
        var newStudent = new Person.Client(firstName, lastName, address);
        console.log("Adding student:" + firstName + " " + lastName +
            " who live in " + address);
        // add the student into temp list
        try{
            _studentList.push(newStudent);
        }
        catch(error) {
            var errorElement1 = document.createElement("div");
            errorElement1.innerHTML = error.message;
            document.getElementsByTagName("body").item[0].appendChild(errorElement1);
        }
    };

    find_a_client_by_name = function(firstname, lastname) {
        //1.get the client list
        var clientlistData = localStorage.getItem('clientList');
        var clientlistobject = JSON.parse(clientlistData);



        //Traverse in the client list to find the client
        for(var i = 0; i <= clientlistobject.length -1 ; i++){
            if(clientlistobject[i].firstName == firstname && clientlistobject[i].lastName == lastname ){
                //we have find the teacher add the class to this client
                //console.log("find the client" + firstname);
                return clientlistobject[i];
            }
        }
    };

    find_a_client_by_firstname = function(firstname) {
        //1.get the client list
        var clientlistData = localStorage.getItem('clientList');
        var clientlistobject = JSON.parse(clientlistData);



        //Traverse in the client list to find the client
        for(var i = 0; i <= clientlistobject.length -1 ; i++){
            if(clientlistobject[i].firstName == firstname ){
                //we have find the teacher add the class to this client
                //console.log("find the client" + firstname);
                return clientlistobject[i];
            }
        }
    };
    //TODO removeStudent

    this.__defineGetter__("studentList", function() {
        return _studentList;
    });

};