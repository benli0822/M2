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
    table.updateSecretaryTableContent(new Date());
    table.update_student_table(sdb.find_a_client_by_name('stu1', 'stu1'));
    //table.updateSecretaryTableContent();



    //set up datepicker
    var datepicker = $('#dp1').datepicker({

    }).on('changeDate', function(ev) {
        datepicker.hide();

        //we update the secretary table with the choosen date
        table.updateSecretaryTableContent(new Date(ev.date));

        console.log("change value to :"+ev.date.toDateString());
    }).data('datepicker');





}