/**
 * Created by CHENG Xiaojun et JIN Benli on 08/10/14.
 */

function search_button_click(){
    var search_text = document.getElementById("searchTextField").value;

        document.getElementById("searchResult").innerHTML = 'clicked';
        var the_student = sdb.find_a_client_by_firstname(search_text);
    if(typeof(the_student) != 'undefined') {
        table.update_student_table(the_student);
    }
}

function login_button_click(){


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    loginController.loginWithUserNamePassword(username,password);



}
