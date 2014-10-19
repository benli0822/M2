/**
 * Created by CHENG Xiaojun et JIN Benli on 19/10/14.
 */


loginController = {
    loginWithUserNamePassword : function (username, password){



        var name = username.split('.');
        if (sedb.login_secretary(name[0],name[1],password)){
            console.log("find the secretary" + username);

            $("#loginModule").fadeOut();
            $("#secretaryModule").fadeIn();
        }
        else if (sdb.student_login(name[0],name[1],password)){
            console.log("find the stu" + username);
            $("#loginModule").fadeOut();

            $("#studentModule").fadeIn();
        }
        else{//we don't find the user
            alert("Wrong username or password, try again");
        }
    }
}