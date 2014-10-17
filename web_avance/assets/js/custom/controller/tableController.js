/**
 * Created by benli on 15/10/14.
 */
table = {
    /**
     * table tool for adding time line into the first column
     * @param table_name
     * @param column_nb
     */
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
                temp_elem.id = table_name + '_' + i + '_' + count;
                var temp_div = document.createElement('div');
                temp_div.innerHTML = '<span id="myPopover' + i + '' + count + '\" ref="popover">Click to pop</span>';
                var selector = '\'#myPopover' + i + '' + count + '\'';
                var script = document.createElement('script');
                script.innerHTML = '$(' + selector + ').popover({\n\t' +
                    'html: true,\n\t' +
                    'title: \'Create a new event<a class="close" href="");">&times;</a>\',\n\t' +
                    'content: $("#popover-content").html()\n' +
                    '});\n' +
                    '$(' + selector + ').click(function (e) {\n\t' +
                    'e.stopPropagation();\n' +
                    '});\n' +
                    '$(document).click(function (e) {\n\t' +
                    'if (($(\'.popover\').has(e.target).length == 0) || $(e.target).is(\'.close\')) {\n\t\t' +
                    '$(' + selector + ').popover(\'hide\');\n\t' +
                    '}\n' +
                    '});';
                temp_div.appendChild(script)
                temp_elem.appendChild(temp_div);
                new_row.appendChild(temp_elem);
            }
            table.appendChild(new_row);
            time++;
            count++;
        }
    },
    /**
     * Creation for secretary table
     * @param table_name
     */
    //TODO need to consider whether we do need this function or not
    createSecretaryTable: function (table_name) {
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
    /**
     * update with the information of teacher database
     */
    updateSecretaryTableContent: function () {
        var secretary_table = document.getElementById('secretary_table');
        //to delete all the content in the table
        secretary_table.innerHTML = "";

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

                    var the_class = the_teacher.list_class[j];
                    secretary_table.rows[the_class.startTime - 7].cells[i + 1].innerHTML = 'YES';

                }
            }
            else {
                console.log("Teacher " + the_teacher.lastName + " not find a lesson");
            }
        }
    },
    /**
     * update student table with the information provided by student database
     * @param student
     */
    update_student_table: function (student) {
        var table = document.getElementById("student_table");
        document.getElementById("searchResult").innerHTML = student.firstName;

        //clear all the existeds elements
        while (table.hasChildNodes()) {
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
        elementDate.innerHTML = "Date";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML = "Time";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML = "Duration";
        first_row.appendChild(elementDate);
        var elementDate = document.createElement('th');
        elementDate.innerHTML = "Teacher";
        first_row.appendChild(elementDate);
        table.appendChild(first_row);


        //travese the class list
        for (var i = 0; i <= student.list_class.length - 1; i++) {

            var tem_class = student.list_class[i];

            //add a new row for this class
            var new_row = document.createElement('tr');

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
            teacherElement.innerHTML = tem_class.teacher.firstName;
            new_row.appendChild(teacherElement);

            table.appendChild(new_row);
        }
    }
}