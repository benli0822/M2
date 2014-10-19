/**
 * Created by benli on 16/10/14.
 */
popover = {
    updatePopoverContent: function (divid) {
        if(typeof(tdb) == "undefined") {
            console.log("Teacher database is not loaded, please make sure it is loaded!");
            return;
        }
        if(typeof(divid) != "undefined") {
            console.log('div id is: ' + divid);
        }
        var id_column = parseInt(divid.substring(9, 10));
        var id_row = parseInt(divid.substring(10, 11));

        var theTeacher = tdb.teacherList[id_column];
        var hour = id_row + 8;

        this.updateHour(hour);
        this.showTheTeacher(theTeacher);
    },

    updateTableContent: function() {
        for(var i=0; i<tdb.teacherList.length; i++) {
            for(var count=0;count<10;count++) {
                var selector = '\'#myPopover' + i + '' + count + '\'';
                var script = document.createElement('script');
                script.innerHTML = '$(' + selector + ').popover({\n\t' +
                    'html: true,\n\t' +
                    'title: \'Create a new event<a class="close");">&times;</a>\',\n\t' +
                    'content: $("#popover-content").html()\n' +
                    '});\n' +
//                    '$(' + selector + ').on(\'shown.bs.popover\', function () {\n\t' +
//                    '$(\'.popoverThis\').not(' + selector + ').popover(\'hide\');' +
//                    '\n});\n' +
                    '$(' + selector + ').on(\'blur\', function () {\n\t' +
                    '$(' + selector + ').popover(\'hide\');\t' +
                    '\n});\n' +
                    '$(' + selector + ').on(\'shown.bs.popover\', function () {\n\t' +
                    'popover.updatePopoverContent(\'myPopover' + i + '' + count + '\')' +
                    '\n});\n' +
                    '$(' + selector + ').click(function (e) {\n\t' +
                    '$(".popoverThis").not(' + selector + ').popover(\'hide\');\n\t' +
                    'e.stopPropagation();\n' +
                    '});\n' +
                    '$(document).click(function (e) {\n\t' +
                    'if ($(\'.popoverThis\').has(e.target).length == 0 || $(e.target).is(\'.close\')) {\n\t\t' +
                    '$(' + selector + ').popover(\'hide\');\n\t' +
                    '}\n' +
                    '});';
                document.body.appendChild(script);
            }
        }
    },

    updateHour: function(hour) {
        var when = document.getElementById('when');
        while(when.firstChild) {
            when.removeChild(when.firstChild);
        }
        var whenLabel = document.createElement('label');
        var text1 = document.createTextNode('When: ');
        var divHour = document.createElement('div');
        divHour.setAttribute('class', 'col-sm-6 col-sm-offset-3');
        var whenHour = document.createElement('p');
        var text2 = document.createTextNode(hour + ":00");
        whenLabel.appendChild(text1);
        whenHour.appendChild(text2);
        whenLabel.setAttribute('class', 'col-sm-2 control-label');
        whenHour.setAttribute('class', 'form-control-static');
        divHour.appendChild(whenHour);
        when.appendChild(whenLabel);
        when.appendChild(divHour);
    },

    showTheTeacher: function(theTeacher) {
        var teacher = document.getElementById('teacher');
        while(teacher.firstChild) {
            teacher.removeChild(teacher.firstChild);
        }
        var teacherLabel = document.createElement('label');
        var text1 = document.createTextNode('Teacher: ');
        var divTeacher = document.createElement('div');
        divTeacher.setAttribute('class', 'col-sm-6 col-sm-offset-3');
        var teacherName = document.createElement('p');
        var text2 = document.createTextNode(theTeacher.firstName + " " + theTeacher.lastName);
        teacherLabel.appendChild(text1);
        teacherName.appendChild(text2);
        teacherLabel.setAttribute('class', 'col-sm-2 control-label');
        teacherName.setAttribute('class', 'form-control-static');
        divTeacher.appendChild(teacherName);
        teacher.appendChild(teacherLabel);
        teacher.appendChild(divTeacher);
    }

}