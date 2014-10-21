/**
 * Created by CHENG Xiaojun et JIN Benli  on 07/10/14.
 */

/*
 init the local storage objects
 */
function initDataHelper() {

    if (typeof(Storage) == "undefined") {
        // Sorry! No Web Storage support..
        alert("Your browser don't support local storage");
        return;
    }

    //init teacher list in the DB
    teacherList = [];
    localStorage.setItem('teacherList', JSON.stringify(teacherList));

    //init class List list in the DB
    classList = [];
    localStorage.setItem('classList', JSON.stringify(classList));


    //init student List list in the DB
    clientList = [];
    localStorage.setItem('clientList', JSON.stringify(clientList));

}


/**
 * add a person to data base
 * @param someone someone can be a teacher or a client
 */
function add_person_to_dataBase(someone) {
    if (someone.type_of_person == 'Teacher') {

        //get the list in DB
        var retrievedObjectData = localStorage.getItem('teacherList');
        var originalObject = JSON.parse(retrievedObjectData);


        originalObject.push(someone);

        //store the list to DB and this will replace the older one
        localStorage.setItem('teacherList', JSON.stringify(originalObject));
    }


    if (someone.type_of_person == 'Client') {

        //get the list in DB
        var retrievedObjectData = localStorage.getItem('clientList');
        var originalObject = JSON.parse(retrievedObjectData);


        originalObject.push(someone);

        //store the list to DB and this will replace the older one
        localStorage.setItem('clientList', JSON.stringify(originalObject));
    }

}


/**
 * add a class to database
 * @param teacher
 * @param client
 * @param duration
 * @param starttime
 */
function save_a_class_to_database(teacher, client, duration, starttime, date) {

    //create a class and save it to db

    //1. create the class locally
    newClass = new Class.DriveClass("class_name", duration, teacher, client, starttime, date);

    console.log('try to add a class which date is : ' + newClass.date);
    //2. add the class to the DB
    var retrievedObjectData = localStorage.getItem('classList');
    var originalObject = JSON.parse(retrievedObjectData);
    originalObject.push(newClass);
    //store the list to DB and this will replace the older one
    localStorage.setItem('classlist', JSON.stringify(originalObject));


    //add the class information to a student

    //1.get the client list
    var clientlistData = localStorage.getItem('clientList');
    var clientlistobject = JSON.parse(clientlistData);

    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {
        if (clientlistobject[i].firstName == client.firstName && clientlistobject[i].lastName == client.lastName) {
            //we have find the client add the class to this client
            var theClient = clientlistobject[i];

            theClient.list_class.push(newClass);

            //we will replace the old client information with the new client information
            clientlistobject[i] = theClient;
            //we will store the new client information to the DB
            localStorage.setItem('clientList', JSON.stringify(clientlistobject));
        }
    }

    //add the class information to a teacher
    //1.get the teacher list
    var teacherlistData = localStorage.getItem('teacherList');
    var teacherlistobject = JSON.parse(teacherlistData);

    //Traverse in the teacher list to find the teacher
    for (var i = 0; i <= teacherlistobject.length - 1; i++) {
        if (teacherlistobject[i].firstName == teacher.firstName && teacherlistobject[i].lastName == teacher.lastName) {
            //we have find the teacher add the class to this teacher
            var theTeacher = teacherlistobject[i];


            //console.log(" add a new class to a teacher" +" which starts at"+newClass.startTime);
            //theTeacher.list_class = new Array(newClass);
            theTeacher.list_class.push(newClass);

            //we will replace the old teacher information with the new teacher information
            teacherlistobject[i] = theTeacher;
            //we will store the new teacher information to the DB

            localStorage.setItem('teacherList', JSON.stringify(teacherlistobject));
        }
    }

}


function get_teacherlist_from_DB() {
    var retrievedObjectData = localStorage.getItem('teacherList');
    var originalObject = JSON.parse(retrievedObjectData);
    return originalObject;
}
function get_clientlist_from_DB() {
    var retrievedObjectData = localStorage.getItem('clientList');
    var originalObject = JSON.parse(retrievedObjectData);
    return originalObject;
}

function get_classlist_from_DB() {
    var retrievedObjectData = localStorage.getItem('classList');
    var originalObject = JSON.parse(retrievedObjectData);
    return originalObject;
}

function find_a_teacher_by_name(firstname, lastname) {
    //1.get the teacher list
    var teacherlistData = localStorage.getItem('teacherList');
    var teacherlistobject = JSON.parse(teacherlistData);


    //Traverse in the teacher list to find the teacher
    for (var i = 0; i <= teacherlistobject.length - 1; i++) {
        if (teacherlistobject[i].firstName == firstname && teacherlistobject[i].lastName == lastname) {
            //we have find the teacher add the class to this teacher
            //console.log("find the teacher" + firstname);
            return teacherlistobject[i];
        }
    }
}
function find_a_client_by_name(firstname, lastname) {

    //1.get the client list
    var clientlistData = localStorage.getItem('clientList');
    var clientlistobject = JSON.parse(clientlistData);


    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {
        if (clientlistobject[i].firstName == firstname && clientlistobject[i].lastName == lastname) {
            //we have find the teacher add the class to this client
            //console.log("find the client" + firstname);
            return clientlistobject[i];
        }
    }
}
function find_a_client_by_firstname(firstname) {

    //1.get the client list
    var clientlistData = localStorage.getItem('clientList');
    var clientlistobject = JSON.parse(clientlistData);


    //Traverse in the client list to find the client
    for (var i = 0; i <= clientlistobject.length - 1; i++) {
        if (clientlistobject[i].firstName == firstname) {
            //we have find the teacher add the class to this client
            //console.log("find the client" + firstname);
            return clientlistobject[i];
        }
    }
}
function add_some_teacher_to_init_db() {


    newlist = [];
    jps = new Person.Teacher('jps', 'jsp', 'jsp', 8);
    ns = new Person.Teacher('ns', 'ns', 'ns', 9);
    bs = new Person.Teacher('bs', 'bs', 'bs', 'bs', 10);
    cheng = new Person.Teacher('cheng', 'cheng', 'cheng', 20);
    newlist.push(jps);
    newlist.push(ns);
    newlist.push(bs);
    newlist.push(cheng);

    localStorage.setItem('teacherList', JSON.stringify(newlist));


}

function add_some_test_data_to_db() {

    test_add_teacher = new Person.Teacher('testT', 'testT', 'lille', 11);
    stu1 = new Person.Client('stu1', 'stu1', 'stu1', 11);
    stu2 = new Person.Client('stu2', 'stu2', 'stu2', 22);
    add_person_to_dataBase(test_add_teacher);
    add_person_to_dataBase(stu1);
    add_person_to_dataBase(stu2);

    save_a_class_to_database(find_a_teacher_by_name('cheng', 'cheng'), find_a_client_by_name('stu1', 'stu1'), 1, 8, '10-14');

    save_a_class_to_database(find_a_teacher_by_name('cheng', 'cheng'), find_a_client_by_name('stu2', 'stu2'), 1, 9, '11-14');


}
