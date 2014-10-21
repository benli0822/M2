/**
 * Created by jamesRMBP on 21/10/14.
 */


secretaryMenuController = {
    display_client_info: function () {

        //remove className
        document.getElementById("secretaryHomePageTab").className =
            document.getElementById("secretaryHomePageTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        //add className
         document.getElementById("secretarySearchStudentTab").className="active";

        $("#secretaryHomePage").fadeOut();
        $("#secretarySearchStudent").fadeIn();
    },
    display_home_page_for_secretary: function () {
       document.getElementById("secretaryHomePageTab").className="active";



        //remove className
        document.getElementById("secretarySearchStudentTab").className =
            document.getElementById("secretarySearchStudentTab").className.replace
            ( /(?:^|\s)active(?!\S)/g , '' );

        $("#secretaryHomePage").fadeIn();
        $("#secretarySearchStudent").fadeOut();
    }
}


