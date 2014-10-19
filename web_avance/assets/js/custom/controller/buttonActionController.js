/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */

buttonAction = {
    search_button_click: function () {
        var search_text = document.getElementById("searchTextField").value;

        console.log("you want to search : " + search_text);

        document.getElementById("searchResult").innerHTML = 'clicked';
        var the_student = sdb.find_a_client_by_firstname(search_text);
        if (typeof(the_student) != 'undefined') {
            table.update_student_table(the_student);
        }
    },

    create_event_click: function () {
//    var time = document.getElementById('pop_time').getAttribute('value').value;
        var time = $('.webui-popover-content:last .form-horizontal #when div #pop_time').attr('value');
        var teacher = $('.webui-popover-content:last .form-horizontal #teacher div #pop_teacher').text();
        var student = $('.webui-popover-content:last .form-horizontal #student div #pop_student').val();
        var selectedClass = $('.webui-popover-content:last .form-horizontal #classes div input[name=optionClass]:checked').val();

        console.log('Selected time: ' + time);
        console.log('Selected teacher: ' + teacher);
        console.log('Selected student: ' + student);
        console.log('Selected selectedClass: ' + selectedClass);

    }
}