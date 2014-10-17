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
}