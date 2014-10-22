/**
 * Created by CHENG Xiaojun et JIN benli on 21/10/14.
 */
$('#secretarySearch').on('click', function () {
    secretaryMenuController.updateStudentList();
    $("#student_list").multiselect('destroy').multiselect({
            buttonWidth: '200px',
            enableFiltering: true,
            maxHeight: 200
        }
    );
    secretaryMenuController.display_client_info();
})

secretaryMenuController = {
    display_client_info: function () {
        //remove className
        document.getElementById("secretaryHomePageTab").className =
            document.getElementById("secretaryHomePageTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');

        //add className
        document.getElementById("secretarySearchStudentTab").className = "active";

        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeIn();
    },
    display_home_page_for_secretary: function () {
        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');

        //add className
        document.getElementById("secretaryHomePageTab").className = "active";
        $('#dp1').datepicker('setValue', new Date());
        $("#secretaryHomePage").fadeIn();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeOut();


        //update teacher table
        table.updateSecretaryTableContent(new Date());
    },

    init_SecretaryMenu: function () {
        $(".alert").alert();

    },
    display_add_student_page: function () {

        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryHomePageTab").className =
            document.getElementById("secretaryHomePageTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');

        //add className
        document.getElementById("secretaryAddStudentTab").className = "active";


        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeIn();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeOut();

    },

    display_add_teacher_page: function () {

        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryHomePageTab").className =
            document.getElementById("secretaryHomePageTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            (/(?:^|\s)active(?!\S)/g, '');

        //add className
        document.getElementById("secretaryAddTeacherTab").className = "active";


        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeIn();
        $("#secretarySearchStudent").fadeOut();
    },

    updateStudentList: function () {
        var studentsName1 = document.getElementById('student_list');
        //clear all the existeds elements
        while (studentsName1.hasChildNodes()) {
            studentsName1.removeChild(studentsName1.firstChild);
        }
        var studentList = sdb.studentList;
        for (var i = 0; i < studentList.length; i++) {
            var studentOption1 = document.createElement('option');
            var text3 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
            studentOption1.setAttribute('value', studentList[i].firstName + "." + studentList[i].lastName);
            studentOption1.appendChild(text3);
            studentsName1.appendChild(studentOption1);
        }
    }
}


