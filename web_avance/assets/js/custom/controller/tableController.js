/**
 * Created by CHENG Xiaojun et JIN Benli on 15/10/14.
 */
table = {
    /**
     * table tool for adding time line into the first column
     * @param table_name
     * @param column_nb
     */
    addTimeLine: function (table_name, column_nb) {
        var table = document.getElementById(table_name);
        var body = document.createElement('tbody');
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
                var temp_div = document.createElement('div');
                temp_elem.id = table_name + '_' + i + '_' + count;
                var popid = document.createAttribute('id');
                popid.value = i + '' + count;
                var popclass = document.createAttribute('class');
                popclass.value = 'show-pop';
                temp_div.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
//                temp_div.innerHTML = '<span id="myPopover' + i + '' + count + '\" class="popover">asdasd</span>';
                temp_div.setAttributeNode(popid);
                temp_div.setAttributeNode(popclass);
                temp_elem.appendChild(temp_div);
                new_row.appendChild(temp_elem);
            }
            body.appendChild(new_row)
            time++;
            count++;
        }
        table.appendChild(body);
    },
    /**
     * Creation for secretary table
     * @param table_name
     */
    //TODO need to consider whether we do need this function or not
    createSecretaryTable: function (table_name) {
        var teacherList = tdb.teacherList;

        var table = document.getElementById(table_name);
        var head = document.createElement('thead');
        var title_row = document.createElement('tr');
        var title_name1 = document.createElement('th');
        title_name1.appendChild(document.createTextNode('Time'));
        title_row.appendChild(title_name1);
        for (var i = 0; i < teacherList.length; i++) {
            var title_temp = document.createElement('th');
            title_temp.appendChild(document.createTextNode(teacherList[i].firstName));
            title_row.appendChild(title_temp);
        }
        head.appendChild(title_row)
        table.appendChild(head);
        this.addTimeLine(table_name, teacherList.length + 1);
    },
    /**
     * update with the information of teacher database
     */
    updateSecretaryTableContent: function (date) {
        var secretary_table = document.getElementById('secretary_table');
        //to delete all the content in the table
        //secretary_table.innerHTML = "";

        console.log("try to update secretart table");
        console.log(date);


        //clear all the existeds elements
        while (secretary_table.hasChildNodes()) {
            secretary_table.removeChild(secretary_table.firstChild);
        }

        this.createSecretaryTable('secretary_table');

        var teacherList = tdb.teacherList;

        //secretary_table.rows[1].cells[1].innerHTML = 'Hello';

        //To update the secretary table we need to traverse the teacher list and for each teacher we display
        // YES(at this moment) in the time area if he has a lesson in that time

        for (var i = 0; i <= teacherList.length - 1; i++) {
            var the_teacher = teacherList[i];

            //we should detect if the list class is null. if is null then the type of list class is undefined
            if (typeof(the_teacher.list_class) != 'undefined') {

                for (var j = 0; j < the_teacher.list_class.length; j++) {

                    var the_class = cdb.getClassById(the_teacher.list_class[j]);
                    console.log(the_class);

                    if (the_class.date.toDateString() == date.toDateString()) {
                        console.log(secretary_table.rows[the_class.startTime - 7].cells[i + 1].firstChild);
                        if (the_class.type === "drive") {
                            secretary_table.rows[the_class.startTime - 7].cells[i + 1].setAttribute("class", "success");
                            secretary_table.rows[the_class.startTime - 7].cells[i + 1].firstChild.innerHTML = "Drive Class";

                        } else {
                            secretary_table.rows[the_class.startTime - 7].cells[i + 1].setAttribute("class", "info");
                            secretary_table.rows[the_class.startTime - 7].cells[i + 1].firstChild.innerHTML = "Lecture Class";
                        }
                    }
                }
            }
            else {
                console.log("Teacher " + the_teacher.lastName + " not find a lesson");
            }
        }
        popover.initPopover();
    },
    /**
     * update student table with the information provided by student database
     * @param student
     */
    update_student_table: function (student) {
        var theStudent = student;

        var table = document.getElementById("student_table");
        /// document.getElementById("searchResult").innerHTML = student.firstName;

        var student_name = document.getElementById("studentName").innerHTML = student.firstName + " " + student.lastName;
        //clear all the existeds elements
        while (table.childNodes.length > 2) {
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
//        var first_row = document.createElement('tr');
//        var elementDate = document.createElement('th');
//        elementDate.innerHTML = "Date";
//        first_row.appendChild(elementDate);
//        var elementDate = document.createElement('th');
//        elementDate.innerHTML = "Time";
//        first_row.appendChild(elementDate);
//        var elementDate = document.createElement('th');
//        elementDate.innerHTML = "Duration";
//        first_row.appendChild(elementDate);
//        var elementDate = document.createElement('th');
//        elementDate.innerHTML = "Teacher";
//        first_row.appendChild(elementDate);
//        table.appendChild(first_row);

        var body = document.createElement('tbody');
        //travese the class list
        for (var i = 0; i <= student.list_class.length - 1; i++) {

            var tem_class = cdb.getClassById(student.list_class[i]);

            //add a new row for this class
            var new_row = document.createElement('tr');


            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            if (tem_class.date.valueOf() > now.valueOf())
                new_row.className = "success";
            else
                new_row.className = "active";

            //add the day_date
            var dateElement = document.createElement('td');
            dateElement.innerHTML = tem_class.date.toDateString();
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
            teacherElement.innerHTML = tem_class.teacher;
            new_row.appendChild(teacherElement);

            var classtypeElement = document.createElement('td');
            classtypeElement.innerHTML = tem_class.type.toString();
            new_row.appendChild(classtypeElement);

            body.appendChild(new_row);
        }
        table.appendChild(body);
    },


    ////
    update_student_table_for_secretary: function (student) {
        var theStudent = student;

        var table = document.getElementById("student_lesson_table");
        /// document.getElementById("searchResult").innerHTML = student.firstName;

        //clear all the existeds elements
        while (table.childNodes.length > 2) {
            table.removeChild(table.lastChild);
        }


        var body = document.createElement('tbody');
        //travese the class list
        for (var i = 0; i <= student.list_class.length - 1; i++) {

            var tem_class = cdb.getClassById(student.list_class[i]);

            //add a new row for this class
            var new_row = document.createElement('tr');


            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            if (tem_class.date.valueOf() > now.valueOf())
                new_row.className = "success";
            else
                new_row.className = "active";

            //add the day_date
            var dateElement = document.createElement('td');
            dateElement.innerHTML = tem_class.date.toDateString();
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
            teacherElement.innerHTML = tem_class.teacher;
            new_row.appendChild(teacherElement);

            var classtypeElement = document.createElement('td');
            classtypeElement.innerHTML = tem_class.type.toString();
            new_row.appendChild(classtypeElement);

            body.appendChild(new_row);
        }
        table.appendChild(body);
    }
}