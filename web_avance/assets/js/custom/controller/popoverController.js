/**
 * Created by CHENG Xiaojun et JIN Benli on 16/10/14.
 */
/**
 * Popover controller, for controlling all popover div in secretary table
 * @type {{trigger: string, title: string, content: content, cache: boolean, width: number, multi: boolean, closeable: boolean, style: string, padding: boolean}}
 */

/**
 * General settings for popover, define its template
 * @type {{trigger: string, title: string, content: content, cache: boolean, width: number, multi: boolean, closeable: boolean, style: string, padding: boolean}}
 */
var settings = {
    trigger: 'click',
    title: '<h4>Create a event</h4>',
    content: function () {
        return $('#popover-content').html();
    },
    cache: false,
    width: 400,
    multi: false,
    closeable: true,
    style: '',
    padding: true
};

/**
 * Add click listener to the document, so each time when we click on a popover div, before the trigger happen, we will update
 * the template with charging the corresponding information
 */
document.addEventListener('click', function (e) {
    if ($(e.target).attr('class') === 'show-pop') {
        var id = $(e.target).attr('id');
        var parent = $(e.target).parent();
        console.log(parent);
//    console.log(id);
        if (typeof(id) != 'undefined') {
            var i = id.substring(0, 1);
            var count = id.substring(1, 2);
            popover.updatePopoverContent(i + '' + count, parent);
        }
    }
}, true);

/**
 * Popover controller methods
 * @type {{initPopover: initPopover, updatePopoverContent: updatePopoverContent, updateHour: updateHour, showTheTeacher: showTheTeacher, showStudentList: showStudentList, updateStudentList: updateStudentList, showClassOption: showClassOption, buttonControl: buttonControl, showMonth: showMonth}}
 */
popover = {
    /**
     * init all popover, also it will listen to the radio options for choosing classes, because a drive class should have one student
     * but a lecture class should have more than one student, so the listener will focus on changing between multiple options or simple
     * option
     */
    initPopover: function () {
        $('div.show-pop').webuiPopover('destroy').webuiPopover(settings).on('click', function () {
            /**
             * Listener handling radio change event
             */
            $('.webui-popover-content:last .form-horizontal #classes div input[name=optionClass]').on('click', function () {
                console.log($(this).val());
                var time = $('.webui-popover-content:last .form-horizontal #when div #pop_time').attr('value');
                var teacher = $('.webui-popover-content:last .form-horizontal #teacher div #pop_teacher').text();

                var times = time.split(".");
                var year = times[0];
                var month = times[1];
                var day = times[2];
                var hour = times[3];

                var id = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour +
                    "." + teacher;
                var idtime = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour;
                console.log(id);
                if ($(this).val() == 'lecture') {

                    popover.updateStudentList(id, idtime, 1);

                    $('.webui-popover-content:last .form-horizontal #student div #pop_student').multiselect('destroy').multiselect({
                        enableFiltering: true,
                        onChange: function (option, checked) {
// Get selected options.
                            var selectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option:selected');

                            if (selectedOptions.length >= 4) {
// Disable all other checkboxes.
                                var nonSelectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option').filter(function () {
                                    return !$(this).is(':selected');
                                });

                                var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                                nonSelectedOptions.each(function () {
                                    var input = $('input[value="' + $(this).val() + '"]');
                                    input.prop('disabled', true);
                                    input.parent('li').addClass('disabled');
                                });
                            }
                            else {
// Enable all checkboxes.
                                var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                                $('.webui-popover-content:last .form-horizontal #student div #pop_student option').each(function () {
                                    var input = $('input[value="' + $(this).val() + '"]');
                                    input.prop('disabled', false);
                                    input.parent('li').addClass('disabled');
                                });
                            }
                        }
                    });
                }
                else {
                    popover.updateStudentList(id, idtime, 0);

                    $('.webui-popover-content:last .form-horizontal #student div #pop_student').multiselect('destroy').multiselect({
                        enableFiltering: true,
                        onChange: function (option, checked) {
// Get selected options.
                            var selectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option:selected');

                            if (selectedOptions.length >= 4) {
// Disable all other checkboxes.
                                var nonSelectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option').filter(function () {
                                    return !$(this).is(':selected');
                                });

                                var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                                nonSelectedOptions.each(function () {
                                    var input = $('input[value="' + $(this).val() + '"]');
                                    input.prop('disabled', true);
                                    input.parent('li').addClass('disabled');
                                });
                            }
                            else {
// Enable all checkboxes.
                                var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                                $('.webui-popover-content:last .form-horizontal #student div #pop_student option').each(function () {
                                    var input = $('input[value="' + $(this).val() + '"]');
                                    input.prop('disabled', false);
                                    input.parent('li').addClass('disabled');
                                });
                            }
                        }
                    });
                }
            });

            /**
             * popover initialisation
             */
            $('.webui-popover-content:last .form-horizontal #student div #pop_student').multiselect({
                enableFiltering: true,
                onChange: function (option, checked) {
// Get selected options.
                    var selectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option:selected');

                    if (selectedOptions.length >= 4) {
// Disable all other checkboxes.
                        var nonSelectedOptions = $('.webui-popover-content:last .form-horizontal #student div #pop_student option').filter(function () {
                            return !$(this).is(':selected');
                        });

                        var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                        nonSelectedOptions.each(function () {
                            var input = $('input[value="' + $(this).val() + '"]');
                            input.prop('disabled', true);
                            input.parent('li').addClass('disabled');
                        });
                    }
                    else {
// Enable all checkboxes.
                        var dropdown = $('.webui-popover-content:last .form-horizontal #student div #pop_student').siblings('.multiselect-container');
                        $('.webui-popover-content:last .form-horizontal #student div #pop_student option').each(function () {
                            var input = $('input[value="' + $(this).val() + '"]');
                            input.prop('disabled', false);
                            input.parent('li').addClass('disabled');
                        });
                    }
                }
            });
        });
    },
    /**
     * General update template interface, all update demand will be sent here
     * @param divid
     * @param parent
     */
    updatePopoverContent: function (divid, parent) {
        if (typeof(tdb) == "undefined") {
            console.log("Teacher database is not loaded, please make sure it is loaded!");
            return;
        }
        if (typeof(divid) != "undefined") {
            console.log('div id is: ' + divid);
        }
        var id_column = parseInt(divid.substring(0, 1));
        var id_row = parseInt(divid.substring(1, 2));

        var theTeacher = tdb.teacherList[id_column];
        var hour = id_row + 8;

        var type = parent.attr('class');

        var id = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour +
            "." + theTeacher.firstName + "." + theTeacher.lastName;

        var idWithoutTeacher = datepicker.date.getFullYear() + "." + (datepicker.date.getMonth() + 1) + "." + datepicker.date.getDate() + "." + hour;

        console.log(id);
        console.log(idWithoutTeacher);

        this.updateHour(hour);
        this.showTheTeacher(theTeacher);
        this.showStudentList(type, id, idWithoutTeacher);
        this.showClassOption(type);
        this.buttonControl(type);

    },

    /**
     * Update the time corresponding the cell chosen
     * @param hour
     */
    updateHour: function (hour) {
        var when = document.getElementById('when');
        while (when.firstChild) {
            when.removeChild(when.firstChild);
        }
        var whenLabel = document.createElement('label');
        var text1 = document.createTextNode('When: ');
        var divHour = document.createElement('div');
        divHour.setAttribute('class', 'col-sm-5 col-sm-offset-2');
        var whenHour = document.createElement('p');
        var text2 = document.createTextNode(this.showMonth(datepicker.date.getMonth() + 1) + " " + datepicker.date.getDate() + " at " + hour + ":00");
        whenHour.setAttribute('id', 'pop_time');
        whenHour.setAttribute('value', datepicker.date.getFullYear() + "." + datepicker.date.getMonth() + "." + datepicker.date.getDate() + "." + hour);
        whenLabel.appendChild(text1);
        whenHour.appendChild(text2);
        whenLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        whenHour.setAttribute('class', 'form-control-static');
        divHour.appendChild(whenHour);
        when.appendChild(whenLabel);
        when.appendChild(divHour);
    },

    /**
     * Update the teacher name corresponding the cell chosen
     * @param theTeacher
     */
    showTheTeacher: function (theTeacher) {
        if (typeof(theTeacher) == 'undefined') {
            console.log('error with loading the teacher');
            return;
        }
        var teacher = document.getElementById('teacher');
        while (teacher.firstChild) {
            teacher.removeChild(teacher.firstChild);
        }
        var teacherLabel = document.createElement('label');
        var text1 = document.createTextNode('Teacher: ');
        var divTeacher = document.createElement('div');
        divTeacher.setAttribute('class', 'col-sm-5 col-sm-offset-2');
        var teacherName = document.createElement('p');
        var text2 = document.createTextNode(theTeacher.firstName + "." + theTeacher.lastName);
        teacherName.setAttribute('id', 'pop_teacher');
        teacherLabel.appendChild(text1);
        teacherName.appendChild(text2);
        teacherLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        teacherName.setAttribute('class', 'form-control-static');
        divTeacher.appendChild(teacherName);
        teacher.appendChild(teacherLabel);
        teacher.appendChild(divTeacher);
    },

    /**
     * show options for student list, there are three situation:
     * 1. first time for creating a class, radio by default is on drive class, so it will be a simple option
     * 2. when click on a existed drive class, should show simple option
     * 3. whe click on a existed lecture class, should give multiple options
     * @param type
     * @param id
     * @param idtime
     */
    showStudentList: function (type, id, idtime) {
        if (typeof(sdb) == "undefined") {
            console.log("Student database is not loaded, please make sure it is loaded!");
            return;
        }
        var studentList = sdb.studentList;
        var students = document.getElementById('student');
        while (students.firstChild) {
            students.removeChild(students.firstChild);
        }
        var studentsLabel = document.createElement('label');
        var text1 = document.createTextNode('Students: ');
        var divStudent = document.createElement('div');
        divStudent.setAttribute('class', 'col-sm-6 col-sm-offset-2');
        // type success stand for drive class, reference could be found with Bootstrap's table css
        if (type == 'success') {
            var theClass = cdb.getClassById(id);
            var text2 = document.createTextNode(theClass.client);
            divStudent.appendChild(text2);
        }
        // info stand for lecture class
        else if (type == 'info') {
            var studentsName1 = document.createElement('select');
            for (var i = 0; i < studentList.length; i++) {
                var studentOption1 = document.createElement('option');
                var text3 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
                studentOption1.setAttribute('value', studentList[i].firstName + "." + studentList[i].lastName);
                var index = studentList[i].hasClass(id);
                console.log(index);
                if (index != -1) {
                    studentOption1.setAttribute('selected', 'selected');
                }
                studentOption1.appendChild(text3);
                studentsName1.appendChild(studentOption1);
            }
            studentsName1.setAttribute('id', 'pop_student');
            studentsName1.setAttribute('multiple', 'multiple');
            divStudent.appendChild(studentsName1);
        }
        // the last left should be the creation part
        else {
            var studentsName2 = document.createElement('select');
            for (var i = 0; i < studentList.length; i++) {
                if (!studentList[i].hasClassAlready(idtime)) {
                    var studentOption2 = document.createElement('option');
                    var text4 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
                    studentOption2.setAttribute('value', studentList[i].firstName + "." + studentList[i].lastName);
                    studentOption2.appendChild(text4);
                    studentsName2.appendChild(studentOption2);
                }
            }
            studentsName2.setAttribute('id', 'pop_student');
//            studentsName2.setAttribute('multiple', 'multiple');
            divStudent.appendChild(studentsName2);
        }
        studentsLabel.appendChild(text1);
        studentsLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        students.appendChild(studentsLabel);
        students.appendChild(divStudent);
    },

    /**
     * Update the list is called by radio listener defined in the beginning of this file, only triggered by changing
     * class option
     * @param id
     * @param idtime
     */
    updateStudentList: function (id, idtime, type) {
        var studentList = sdb.studentList;
        $('.webui-popover-content:last .form-horizontal #student div').empty();
        var studentsName1 = document.createElement('select');
        for (var i = 0; i < studentList.length; i++) {
            if (!studentList[i].hasClassAlready(idtime)) {
                var studentOption1 = document.createElement('option');
                var text3 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
                studentOption1.setAttribute('value', studentList[i].firstName + "." + studentList[i].lastName);
                var index = studentList[i].hasClass(id);
                console.log(index);
                if (index != -1) {
                    studentOption1.setAttribute('selected', 'selected');
                }
                studentOption1.appendChild(text3);
                studentsName1.appendChild(studentOption1);
            }
        }
        studentsName1.setAttribute('id', 'pop_student');
        if(type == 1) {
            studentsName1.setAttribute('multiple', 'multiple');
        }
        $('.webui-popover-content:last .form-horizontal #student div')[0].appendChild(studentsName1);
    },

    /**
     * Generate the radio options for classes
     * @param type
     */
    showClassOption: function (type) {
        var classes = document.getElementById('classes');
        while (classes.firstChild) {
            classes.removeChild(classes.firstChild);
        }
        var classesLabel = document.createElement('label');
        var text1 = document.createTextNode('Class\'s Type: ');
        var divClasses = document.createElement('div');
        divClasses.setAttribute('class', 'col-sm-6 col-sm-offset-2');
        if (type == "success") {
            var text2 = document.createTextNode("Drive Class");
            divClasses.appendChild(text2);
        } else if (type == "info") {
            var text3 = document.createTextNode("Lecture Class");
            divClasses.appendChild(text3);
        } else {
            divClasses.innerHTML = '<label>' +
                '<input type="radio" name="optionClass" id="drive" value="drive" checked>' +
                'Drive Class' +
                '</label>';
            divClasses.innerHTML += '<label>' +
                '<input type="radio" name="optionClass" id="lecture" value="lecture">' +
                'Lecture Class' +
                '</label>';
        }
        classesLabel.appendChild(text1);
        classesLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        classes.appendChild(classesLabel);
        classes.appendChild(divClasses);
    },

    /**
     * Controlling static buttons presence in different popover
     * @param type
     */
    buttonControl: function (type) {
        if (type != null) {
            $("#create").hide();
            $("#edit").show();
            $("#delete").show();
        } else {
            $("#create").show();
            $("#edit").hide();
            $("#delete").hide();
        }
    },

    /**
     * Transform the number to string
     * @param month
     * @returns {*}
     */
    showMonth: function (month) {
        var monthText;
        switch (month) {
            case 1 :
                monthText = "January";
                break;
            case 2 :
                monthText = "February";
                break;
            case 3 :
                monthText = "March";
                break;
            case 4 :
                monthText = "April";
                break;
            case 5 :
                monthText = "May";
                break;
            case 6 :
                monthText = "June";
                break;
            case 7 :
                monthText = "July";
                break;
            case 8 :
                monthText = "August";
                break;
            case 9 :
                monthText = "September";
                break;
            case 10 :
                monthText = "October";
                break;
            case 11 :
                monthText = "November";
                break;
            case 12 :
                monthText = "December";
                break;
        }
        return monthText;
    }

}