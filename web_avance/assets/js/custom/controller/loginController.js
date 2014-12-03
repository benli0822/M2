/**
 * Created by CHENG Xiaojun et JIN Benli on 19/10/14.
 */
/**
 * Login action controller
 * @type {{loginWithUserNamePassword: loginWithUserNamePassword}}
 */
loginController = {
    loginWithUserNamePassword: function (username, password) {
        var name = username.split('.');
        if (sedb.login_secretary(name[0], name[1], password)) {
            $('#dp1').datepicker('setValue', new Date());
            console.log("find the secretary" + username);
            $("#loginError").hide();
            $("#loginModule").fadeOut();
            $("#secretaryModule").fadeIn();
            secretaryMenuController.display_home_page_for_secretary();
            $("#disconnectDiv").fadeIn();
            $("#login_without_save_button").fadeIn();
            document.getElementById("login_button").innerHTML = "Logout and Save to DB";
        }
        else if (sdb.student_login(name[0], name[1], password)) {
            console.log("find the stu" + username);
            $("#loginError").hide();
            //update student table
            sdb.sortClasslist(sdb.find_a_client_by_name(name[0], name[1]));
            table.update_student_table(sdb.find_a_client_by_name(name[0], name[1]));
            $("#loginModule").fadeOut();

            $("#studentModule").fadeIn();
            $("#disconnectDiv").fadeIn();
            $("#login_without_save_button").fadeOut();
            document.getElementById("login_button").innerHTML = "Logout";
        }
        else {//we don't find the user

            $("#loginError").text("Wrong username or password, try again").show();
        }
    }
}