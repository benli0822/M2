/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */

$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#loginButton").click();
    }
});

buttonAction = {
    search_button_click: function () {
        var search_text = document.getElementById("searchTextField").value;


        console.log("you want to search : " + search_text);


        document.getElementById("searchResult").innerHTML = 'clicked';
        var the_student = sdb.find_a_client_by_firstname(search_text);
        if (typeof(the_student) != 'undefined') {
            table.update_student_table_for_secretary(the_student);
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

        var times = time.split(".");
        var year = times[0];
        var month = times[1];
        var day = times[2];
        var hour = times[3];
        console.log(year);
        console.log(month);
        console.log(day);
        console.log(hour);
        var theDate = new Date(year, month, day, hour);
        cdb.addAClass(selectedClass, teacher, student, 1, hour, theDate, selectedClass, sdb, tdb);
        table.updateSecretaryTableContent(theDate);

        $('.webui-popover:last').hide();
    },

    login_button_click: function () {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        loginController.loginWithUserNamePassword(username, password);
    },
    logout_button_click: function () {
        main.closeNormal();
        $(".webui-popover").hide();
        $("#studentModule").fadeOut();
        $("#secretaryModule").fadeOut();
        $("#loginModule").fadeIn();
    }
}



