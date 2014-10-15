/**
 * Created by CHENG Xiaojun et JIN Benli on 01/10/14.
 */
var tdb = new TeacherDB();
var sdb = new StudentDB();
var cdb = new ClassDB();

main = {
    addTeacher: function (firstName, lastName, address) {
        tdb.addTeacher(firstName, lastName, address);
    },
    addTeacherObject: function (teacher) {
        tdb.addTeacherObject(teacher);
    },
    addStudent: function (firstName, lastName, address) {
        tdb.addStudent(firstName, lastName, address);
    },
    addStudentObject: function (student) {
        sdb.addStudentObject(student);
    },
    addAClass: function (name, teacher, client, duration, startTime, date, type) {
        // check teacher if exist, if not, create the teacher
        if (!tdb.hasTeacher(teacher)) {
            tdb.addTeacherObject(teacher);
        }
        if (!sdb.hasStudent(client)) {
            sdb.addStudentObject(client);
        }
        cdb.addAClass(name, teacher, client, duration, startTime,
            date, type, sdb, tdb);
    },
    addTimeLine: function (table_name, column_nb) {
        var table = document.getElementById(table_name);
        var time = 8;
        var count = 0;
        while (time < 18) {
            var new_row = document.createElement('tr');
            var new_item = document.createElement('td');
            var node_text = document.createTextNode(time.toString() + ':00');
            new_item.appendChild(node_text);
            new_row.appendChild(new_item);
            for (var i = 0; i < column_nb - 1; i++) {
                var temp_elem = document.createElement('td');
                var att1 = document.createAttribute('class');
                att1.value = 'myPopover';
                temp_elem.id = table_name + '_' + i + '_' + count;
//            var att2 = document.createAttribute('contenteditable');
//            att2.value = 'true';
                temp_elem.setAttributeNode(att1);
//            temp_elem.setAttributeNode(att2)
                new_row.appendChild(temp_elem);
            }
            table.appendChild(new_row);
            time++;
            count++;
        }
    },
    createSecretaryTable: function(table_name) {
        var teacherList = tdb.teacherList;

        var table = document.getElementById(table_name);
        var title_row = document.createElement('tr');
        var title_name1 = document.createElement('th');
        title_name1.appendChild(document.createTextNode('Time'));
        title_row.appendChild(title_name1);
        for (var i = 0; i < teacherList.length; i++) {
            var title_temp = document.createElement('th');
            title_temp.appendChild(document.createTextNode(teacherList[i].firstName));
            title_row.appendChild(title_temp);
        }
        table.appendChild(title_row);
        this.addTimeLine(table_name, teacherList.length + 1);
    },
    updateSecretaryTableContent: function() {
        var secretary_table = document.getElementById('secretary_table');
        //to delete all the content in the table
        secretary_table.innerHTML = "";

        this.createSecretaryTable('secretary_table');

        var teacherList = tdb.teacherList;

        //secretary_table.rows[1].cells[1].innerHTML = 'Hello';

        //To update the secretary table we need to traverse the teacher list and for each teacher we display
        // YES(at this moment) in the time area if he has a lesson in that time

        for( var i = 0 ; i <= teacherList.length -1 ; i++){
            var the_teacher = teacherList[i];

            //we should detect if the list class is null. if is null then the type of list class is undefined
            if(typeof(the_teacher.list_class) != 'undefined') {

                for (var j = 0; j <= the_teacher.list_class.length - 1; j++) {

                    var the_class = the_teacher.list_class[j];
                    secretary_table.rows[the_class.startTime - 7].cells[i+1].innerHTML = 'YES';

                }
            }
            else{
                console.log("Teacher " + the_teacher.lastName + " not find a lesson");
            }
        }
    },
    update_student_table: function(student) {
        var table = document.getElementById("student_table");
        document.getElementById("searchResult").innerHTML = student.firstName;

        //clear all the existeds elements
        while(table.hasChildNodes()){
            table.removeChild(table.lastChild);
        }

        //create the first row
        /*
         <tr>
         <th id="abc">Date</th>
         <th>Time</th>
         <th>Duration</th>
         <th>Teacher</th>
         </tr>
         */
        var first_row = document.createElement('tr');
        var elementDate = document.createElement('th');
        elementDate.innerHTML="Date";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML="Time";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML="Duration";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML="Teacher";
        first_row.appendChild(elementDate);
        table.appendChild(first_row);


        //travese the class list
        for( var i = 0 ; i <= student.list_class.length -1 ; i++){

            var tem_class = student.list_class[i];

            //add a new row for this class
            var new_row = document.createElement('tr');

            //add the day_date
            var dateElement = document.createElement('td');
            dateElement.innerHTML = tem_class.date;
            new_row.appendChild(dateElement);

            //add the time
            var timeElement = document.createElement('td');
            timeElement.innerHTML = tem_class.startTime + ':00';
            new_row.appendChild(timeElement);

            //add the duration
            var durationElement = document.createElement('td');
            durationElement.innerHTML = tem_class.duration;
            new_row.appendChild(durationElement);

            //add the teacher
            var teacherElement = document.createElement('td');
            teacherElement.innerHTML = tem_class.teacher.firstName;
            new_row.appendChild(teacherElement);

            table.appendChild(new_row);
        }


    },
    closeNormal: function() {
        sdb.close(1);
        tdb.close(1);
        cdb.close(1);
    },
    closeException: function() {
        sdb.close(0);
        tdb.close(0);
        cdb.close(0);
    }
};

test = {
    addTeacherExamples: function () {
        var jps = new Person.Teacher('jps', 'jsp', 'jsp');
        var ns = new Person.Teacher('ns', 'ns', 'ns');
        var bs = new Person.Teacher('bs', 'bs', 'bs');
        var cheng = new Person.Teacher('cheng', 'cheng', 'cheng');
        main.addTeacherObject(jps);
        main.addTeacherObject(ns);
        main.addTeacherObject(bs);
        main.addTeacherObject(cheng);
    },
    addTestDataToDB: function () {
        var teacher = new Person.Teacher('testT', 'testT', 'lille1');
        var stu1 = new Person.Client('stu1', 'stu1', 'stu1');
        var stu2 = new Person.Client('stu2', 'stu2', 'stu2');
        main.addTeacherObject(teacher);
        main.addStudentObject(stu1);
        main.addStudentObject(stu2);
        cdb.addAClass('drive', teacher, stu1, 1, 8, '10-14', 'drive', sdb, tdb);
        cdb.addAClass('lecture', teacher, stu2, 1, 8, '10-14', 'lecture', sdb, tdb);
    }

};


window.onload = function () {
    test.addTeacherExamples();
    test.addTestDataToDB();
    main.addTimeLine('student_table', 4);
    main.createSecretaryTable('secretary_table');
    main.updateSecretaryTableContent();
    main.update_student_table(sdb.find_a_client_by_name('stu1', 'stu1'));
    main.updateSecretaryTableContent();

    var options = {
        html: true,
        trigger: "hover focus",
        title: function () {
            return $("#popover-head").html();
        },
        content: function () {
            return $("#popover-content").html();
        }
    }
//    $.getScript("js/custom/controller.js", function () {
    $('.myPopover').popover(options);
//    });
    /*
     // Check browser support
     if (typeof(Storage) != 'undefined') {
     // Store
     localStorage.setItem('period1', '20');
     // Retrieve
     document.getElementById('student_table_0_0').innerHTML = localStorage.getItem('period1');
     } else {
     document.getElementById('student_table_0_0').innerHTML = 'Sorry, your browser does not support Web Storage...';
     }
     */

}