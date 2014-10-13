/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */
function update_secretary_table(){

    var secretary_table = document.getElementById('secretary_table');
    //to detele all the content in the table
    secretary_table.innerHTML = "";

    updateTeacherTableElement("secretary_table",4);

    //secretary_table.rows[1].cells[1].innerHTML = 'Hello';

    //To update the secretary table we need to traverse the teacher list and for each teacher we display
    // YES(at this moment) in the time area if he has a lesson in that time

    var teacher_list = get_teacherlist_from_DB();

    for( var i = 0 ; i <= teacher_list.length -1 ; i++){
        the_teacher = teacher_list[i];

        //we should detect if the list class is null. if is null then the type of list class is undefined
        if(typeof  the_teacher.list_class != 'undefined') {

            for (var j = 0; j <= the_teacher.list_class.length - 1; j++) {

                var the_class = the_teacher.list_class[j];
                secretary_table.rows[the_class.startTime - 7].cells[i+1].innerHTML = 'YES';

            }
        }
        else{
            //console.log("Teacher " + the_teacher.lastName + " not find a lesson");
        }
    }

}

function update_student_table(student){
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


}


function search_button_click(){
    search_text = document.getElementById("searchTextField").value;

    console.log("you want to search : " + search_text);

        document.getElementById("searchResult").innerHTML = 'clicked';
        var the_student = find_a_client_by_firstname(search_text);
    if(typeof  the_student != undefined) {
        update_student_table(the_student);
    }
}
