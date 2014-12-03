/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */

/**
 * Button action controller for definition of all button like action
 * @type {{search_button_click: search_button_click, create_event_click: create_event_click, edit_event_click: edit_event_click, login_button_click: login_button_click, logout_button_click: logout_button_click, logout_button_click_without_save: logout_button_click_without_save, add_Teacher_button_click: add_Teacher_button_click, add_Student_button_click: add_Student_button_click, delete_a_class_button_click: delete_a_class_button_click}}
 */
buttonAction = {
    search_button_click: function () {
        var search_text = $("#student_list").val();

        var name = search_text.split(".");
        console.log("you want to search : " + search_text);


        var the_student = sdb.find_a_client_by_name(name[0], name[1]);
        if (typeof(the_student) != 'undefined' && the_student != false) {
            table.update_student_table_for_secretary(the_student);
            document.getElementById("searchResult").innerHTML = 'here is the search result';
            $(".alert").show();

            $(".alert strong").text("Student found");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 2000);
        }
        else {
            $(".alert").show();

            $(".alert strong").text("Student not found");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 3000);
        }
    },

    create_event_click: function () {
//    var time = document.getElementById('pop_time').getAttribute('value').value;
        var time = $('.webui-popover-content:last .form-horizontal #when div #pop_time').attr('value');
        var teacher = $('.webui-popover-content:last .form-horizontal #teacher div #pop_teacher').text();
//        var student = $('.webui-popover-content:last .form-horizontal #student div #pop_student').val();
        var selectedStudents = $('.webui-popover-content:last .form-horizontal #student div #pop_student').val();
        var selectedClass = $('.webui-popover-content:last .form-horizontal #classes div input[name=optionClass]:checked').val();

        console.log('Selected time: ' + time);
        console.log('Selected teacher: ' + teacher);
//        console.log('Selected student: ' + student);
        console.log('Selected selectedClass: ' + selectedClass);
        console.log('Selected student: ' + selectedStudents);

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

        if (selectedClass == "drive") {
            cdb.addAClass(selectedClass, teacher, selectedStudents, 1, hour, theDate, selectedClass, sdb, tdb);
            table.updateSecretaryTableContent(theDate);
            $('.webui-popover:last').hide();
        } else {
            var id = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour +
                "." + teacher;

            if (selectedStudents.length != 0) {
                for (var i = 0; i < selectedStudents.length; i++) {
                    console.log(cdb.getClassById(id));
                    if (cdb.getClassById(id) != null) {
                        var studentName = selectedStudents[i].split(".");
                        var theStudent = sdb.find_a_client_by_name(studentName[0], studentName[1]);
                        console.log(theStudent);
                        if (theStudent.hasClass(id) == -1) {
                            theStudent.list_class.push(id);
                            console.log("added to" + theStudent);
                        }
                    } else {
                        cdb.addAClass(selectedClass, teacher, selectedStudents[i], 1, hour, theDate, selectedClass, sdb, tdb);
                    }
                }
                table.updateSecretaryTableContent(theDate);
                $('.webui-popover:last').hide();
            }
        }

    },

    edit_event_click: function () {
        var selectedClass = $('.webui-popover-content:last .form-horizontal #classes div').text();
        console.log(selectedClass);
        if (selectedClass == "Lecture Class") {
//    var time = document.getElementById('pop_time').getAttribute('value').value;
            var time = $('.webui-popover-content:last .form-horizontal #when div #pop_time').attr('value');
            var teacher = $('.webui-popover-content:last .form-horizontal #teacher div #pop_teacher').text();
//        var student = $('.webui-popover-content:last .form-horizontal #student div #pop_student').val();
            var selectedStudents = $('.webui-popover-content:last .form-horizontal #student div #pop_student').val();

            console.log('Selected time: ' + time);
            console.log('Selected teacher: ' + teacher);
//        console.log('Selected student: ' + student);
            console.log('Selected selectedClass: ' + selectedClass);
            console.log('Selected student: ' + selectedStudents);

            var times = time.split(".");
            var year = times[0];
            var month = times[1];
            var day = times[2];
            var hour = times[3];
            console.log(year);
            console.log(month);
            console.log(day);
            console.log(hour);


            var id = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour +
                "." + teacher;

            var theDate = new Date(year, month, day, hour);

            if (selectedStudents.length != 0) {
                for (var i = 0; i < selectedStudents.length; i++) {
                    console.log(cdb.getClassById(id));
                    if (cdb.getClassById(id) != null) {
                        var studentName = selectedStudents[i].split(".");
                        var theStudent = sdb.find_a_client_by_name(studentName[0], studentName[1]);
                        console.log(theStudent);
                        if (theStudent.hasClass(id) == -1) {
                            theStudent.list_class.push(id);
                            console.log("added to" + theStudent);
                        }
                    } else {
                        cdb.addAClass(selectedClass, teacher, selectedStudents[i], 1, hour, theDate, selectedClass, sdb, tdb);
                    }
                }
                table.updateSecretaryTableContent(theDate);
                $('.webui-popover:last').hide();
            }
        } else {

        }
    },

    login_button_click: function () {

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        loginController.loginWithUserNamePassword(username, password);
    },
    logout_button_click: function () {
        $("#disconnectDiv").fadeOut();
        main.closeNormal();
        $(".webui-popover").hide();
        $("#studentModule").fadeOut();
        $("#secretaryModule").fadeOut();
        $("#loginModule").fadeIn();
        document.getElementById("login_button").innerHTML = "Logout";
    },
    logout_button_click_without_save: function () {
        $("#disconnectDiv").fadeOut();
//        main.closeException();
        $(".webui-popover").hide();
        $("#studentModule").fadeOut();
        $("#secretaryModule").fadeOut();
        $("#loginModule").fadeIn();
        document.getElementById("login_button").innerHTML = "Logout and Save";
    },
    add_Teacher_button_click: function () {

        var firstname = document.getElementById("addTeacherFirstname").value;
        var lastname = document.getElementById("addTeacherLastname").value;
        var address = document.getElementById("addTeacherAddresse").value;
        var pwd = document.getElementById("addTeacherPassword").value;


        if (firstname.length >= 2 && lastname.length >= 2 && address.length >= 2 && pwd.length >= 2) {
            tdb.addTeacher(firstname, lastname, address, pwd);
            secretaryMenuController.display_home_page_for_secretary();

            $(".alert").show();

            $(".alert strong").text("Add teacher success,and go to home page");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 1000);

        }
        else {
            //alert("Try to correct information. each words should be more then 2 words");

            $(".alert").show();

            $(".alert strong").text("Try to correct information. each words should be more then 2 words");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 2000);
        }
    },


    add_Student_button_click: function () {

        var firstname = document.getElementById("addStudentFirstname").value;
        var lastname = document.getElementById("addStudentLastname").value;
        var address = document.getElementById("addStudentAddresse").value;
        var pwd = document.getElementById("addStudentPassword").value;


        if (firstname.length >= 2 && lastname.length >= 2 && address.length >= 2 && pwd.length >= 2) {
            sdb.addStudent(firstname, lastname, address, pwd);
            secretaryMenuController.display_home_page_for_secretary();

            $(".alert").show();

            $(".alert strong").text("Add Student success,and go to home page");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 1000);

        }
        else {
            //alert("Try to correct information. each words should be more then 2 words");

            $(".alert").show();

            $(".alert strong").text("Try to correct information. each words should be more then 2 words");
            window.setTimeout(function () {
                $(".alert").fadeOut();
            }, 2000);
        }
    },

    delete_a_class_button_click: function () {
        //delete action fire
        var time = $('.webui-popover-content:last .form-horizontal #when div #pop_time').attr('value');
        var teacher = $('.webui-popover-content:last .form-horizontal #teacher div #pop_teacher').text();

        var times = time.split(".");
        var year = times[0];
        var month = times[1];
        var day = times[2];
        var hour = times[3];

        var id = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour +
            "." + teacher;
        var theDate = new Date(year, month, day, hour);


        cdb.deleteClass(id);

        //update secretary table

        table.updateSecretaryTableContent(theDate);
        //hide popover
        $('.webui-popover:last').hide();


    }
}



