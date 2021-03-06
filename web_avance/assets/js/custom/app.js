/**
 * Created by CHENG Xiaojun et JIN Benli on 15/10/14.
 */

var lwrapper = new LocalStorageWrapper();
var tdb = new TeacherDB();
var sdb = new StudentDB();
var cdb = new ClassDB();
var sedb = new SecretaryDB();


//set up datepicker
var datepicker = $('#dp1').datepicker().on('changeDate', function (ev) {
    datepicker.hide();

    //we update the secretary table with the choosen date
    table.updateSecretaryTableContent(new Date(ev.date));

    console.log("change value to :" + ev.date.toDateString());
}).data('datepicker');

window.onload = function () {
    $("#studentModule").fadeOut();
    $("#secretaryModule").fadeOut();
    $("#disconnectDiv").fadeOut();
    secretaryMenuController.init_SecretaryMenu();
    test.addTeacherExamples();
    test.addTestDataToDB();
    table.addTimeLine('student_table', 4);
    table.createSecretaryTable('secretary_table');
    table.updateSecretaryTableContent(new Date());
    $('#dp1').datepicker('setValue', new Date());

    popover.initPopover();
};