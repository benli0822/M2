/**
 * Created by benli on 16/10/14.
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

document.addEventListener('click', function (e) {
    if ($(e.target).attr('class') === 'show-pop') {
        var id = $(e.target).attr('id');
        var parent = $(e.target).parent();
        console.log(parent);
//    console.log(id);
        if (typeof(id) != 'undefined') {
            var i = id.substring(0, 1);
            var count = id.substring(1, 2);
            popover.updatePopoverContent(i + '' + count);
        }
    }
}, true);


popover = {
    initPopover: function () {
        $('div.show-pop').webuiPopover('destroy').webuiPopover(settings);
    },
    updatePopoverContent: function (divid) {
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

        this.updateHour(hour);
        this.showTheTeacher(theTeacher);
        this.showStudentList();
        this.showClassOption();
    },

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

    showStudentList: function () {
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
        var studentsName = document.createElement('select');
        for (var i = 0; i < studentList.length; i++) {
            var studentOption = document.createElement('option');
            var text2 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
            studentOption.setAttribute('value', studentList[i].firstName + "." + studentList[i].lastName);
            studentOption.appendChild(text2);
            studentsName.appendChild(studentOption);
        }
        studentsName.setAttribute('id', 'pop_student');
        studentsLabel.appendChild(text1);
        studentsLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        divStudent.appendChild(studentsName);
        students.appendChild(studentsLabel);
        students.appendChild(divStudent);
    },

    showClassOption: function () {
        var classes = document.getElementById('classes');
        while (classes.firstChild) {
            classes.removeChild(classes.firstChild);
        }
        var classesLabel = document.createElement('label');
        var text1 = document.createTextNode('Class\'s Type: ');
        var divClasses = document.createElement('div');
        divClasses.setAttribute('class', 'col-sm-6 col-sm-offset-2 radio');
        divClasses.innerHTML = '<label>' +
            '<input type="radio" name="optionClass" id="drive" value="drive" checked>' +
            'Drive Class' +
            '</label>';
        divClasses.innerHTML += '<label>' +
            '<input type="radio" name="optionClass" id="lecture" value="lecture">' +
            'Lecture Class' +
            '</label>';
        classesLabel.appendChild(text1);
        classesLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        classes.appendChild(classesLabel);
        classes.appendChild(divClasses);
    },

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