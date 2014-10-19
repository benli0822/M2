/**
 * Created by CHENG Xiaojun et JIN Benli on 19/10/14.
 */


loginController = {
    loginWithUserNamePassword : function (username, password){



        var name = username.split('.');
        if (sedb.login_secretary(name[0],name[1],password)){
            console.log("find the secretary" + username);
        }
        else if (sdb.student_login(name[0],name[1],password)){
            console.log("find the stu" + username);
        }
        else{//we don't find the user

        }
    }
}