/**
 * Created by benli on 16/10/14.
 */
var settings = {
    trigger: 'click',
    title: 'Create a event',
    content: function () {
        return $('#popover-content').html();
    },
    width: 300,
    multi: false,
    closeable: true,
    style: '',
    padding: true
};

document.addEventListener('click', function (e) {
    var id = $(e.target).attr('id');
//    console.log(id);
    if (typeof(id) != 'undefined') {
        var i = id.substring(0, 1);
        var count = id.substring(1, 2);
        popover.updatePopoverContent(i + '' + count);
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
    },

    updateHour: function (hour) {
        var when = document.getElementById('when');
        while (when.firstChild) {
            when.removeChild(when.firstChild);
        }
        var whenLabel = document.createElement('label');
        var text1 = document.createTextNode('When: ');
        var divHour = document.createElement('div');
        divHour.setAttribute('class', 'col-sm-6 col-sm-offset-2');
        var whenHour = document.createElement('p');
        var text2 = document.createTextNode(hour + ":00");
        whenLabel.appendChild(text1);
        whenHour.appendChild(text2);
        whenLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        whenHour.setAttribute('class', 'form-control-static');
        divHour.appendChild(whenHour);
        when.appendChild(whenLabel);
        when.appendChild(divHour);
    },

    showTheTeacher: function (theTeacher) {
        if(typeof(theTeacher) == 'undefined') {
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
        divTeacher.setAttribute('class', 'col-sm-6 col-sm-offset-2');
        var teacherName = document.createElement('p');
        var text2 = document.createTextNode(theTeacher.firstName + "." + theTeacher.lastName);
        teacherLabel.appendChild(text1);
        teacherName.appendChild(text2);
        teacherLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        teacherName.setAttribute('class', 'form-control-static');
        divTeacher.appendChild(teacherName);
        teacher.appendChild(teacherLabel);
        teacher.appendChild(divTeacher);
    },

    showStudentList: function() {
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
        for(var i=0; i<studentList.length; i++) {
            var studentOption = document.createElement('option');
            var text2 = document.createTextNode(studentList[i].firstName + "." + studentList[i].lastName);
            studentOption.appendChild(text2);
            studentsName.appendChild(studentOption);
        }
        studentsLabel.appendChild(text1);
        studentsLabel.setAttribute('class', 'col-sm-2 col-sm-offset-2 control-label');
        divStudent.appendChild(studentsName);
        students.appendChild(studentsLabel);
        students.appendChild(divStudent);
    }

}