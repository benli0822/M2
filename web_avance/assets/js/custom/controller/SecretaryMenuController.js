/**
 * Created by jamesRMBP on 21/10/14.
 */


secretaryMenuController = {
    display_client_info: function () {

        //remove className
        document.getElementById("secretaryHomePageTab").className =
document.getElementById("secretaryHomePageTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        //add className
         document.getElementById("secretarySearchStudentTab").className="active";

        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeIn();
    },
    display_home_page_for_secretary: function () {
        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        //add className
        document.getElementById("secretaryHomePageTab").className="active";

        $("#secretaryHomePage").fadeIn();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeOut();


        //update teacher table
        table.updateSecretaryTableContent(new Date());
    },

    init_SecretaryMenu:function(){
        $(".alert").alert();

    },
    display_add_student_page :function(){

        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryHomePage").className =
            document.getElementById("secretaryHomePage").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddTeacherTab").className =
            document.getElementById("secretaryAddTeacherTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        //add className
        document.getElementById("secretaryAddStudentTab").className="active";



        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeIn();
        $("#secretaryAddTeacher").fadeOut();
        $("#secretarySearchStudent").fadeOut();

    },

    display_add_teacher_page:function(){

        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryHomePage").className =
            document.getElementById("secretaryHomePage").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );
        document.getElementById("secretaryAddStudentTab").className =
            document.getElementById("secretaryAddStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        //add className
        document.getElementById("secretaryAddTeacherTab").className="active";


        $("#secretaryHomePage").fadeOut();
        $("#secretaryAddStudent").fadeOut();
        $("#secretaryAddTeacher").fadeIn();
        $("#secretarySearchStudent").fadeOut();
    }

}


