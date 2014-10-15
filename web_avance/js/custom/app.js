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

    $('.myPopover').popover({
        html: true,
        title: 'Create a new event<a class="close" href="#");">&times;</a>',
        content: $("#popover-content").html()
    });

    $('.myPopover').click(function (e) {
        e.stopPropagation();
    });

    $(document).click(function (e) {
        if (($('.myPopover').has(e.target).length == 1) || $(e.target).is('.close')) {
            $('.myPopover').popover('hide');
        }
    });
}