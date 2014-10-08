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
                console.log("Find a lesson");
                var the_class = the_teacher.list_class[j];
                secretary_table.rows[the_class.startTime - 7].cells[i+1].innerHTML = 'YES';

            }
        }
        else{
            //console.log("Teacher " + the_teacher.lastName + " not find a lesson");
        }
    }

    

}
