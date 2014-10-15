/**
 * Created by benli on 15/10/14.
 */
var tdb = new TeacherDB();
var sdb = new StudentDB();
var cdb = new ClassDB();
window.onload = function () {
    test.addTeacherExamples();
    test.addTestDataToDB();
    table.addTimeLine('student_table', 4);
    table.createSecretaryTable('secretary_table');
    table.updateSecretaryTableContent();
    table.update_student_table(sdb.find_a_client_by_name('stu1', 'stu1'));
    table.updateSecretaryTableContent();

//    var body = document.body;
//    for (var i = 0; i < tdb.teacherList.length; i++) {
//        for (var j = 0; j < 10; j++) {
//            var selector = '\'#myPopover' + i + '' + j + '\'';
//            var script = document.createElement('script');
//            script.innerHTML = '$(' + selector + ').popover({\n\t' +
//                'html: true,\n\t' +
//                'title: \'Create a new event<a class="close" href="#");">&times;</a>\',\n\t' +
//                'content: $("#popover-content").html()\n' +
//                '});\n' +
//                '$(' + selector + ').click(function (e) {\n\t' +
//                'e.stopPropagation();\n' +
//                '});\n' +
//                '$(document).click(function (e) {\n\t' +
//                'if (($(\'.popover\').has(e.target).length == 1) || $(e.target).is(\'.close\')) {\n\t\t' +
//                '$(' + selector + ').popover(\'hide\');\n\t' +
//                '}\n' +
//                '});';
//
//            body.appendChild(script);
//        }
//    }

}