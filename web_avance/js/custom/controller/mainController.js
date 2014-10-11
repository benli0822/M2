/**
 * Created by CHENG Xiaojun et JIN Benli on 01/10/14.
 */
function initObjects() {

    initDataHelper();
    add_some_teacher_to_init_db();




    add_some_test_data_to_db();


}

function addTimeLine(table_name, column_nb) {
    var table = document.getElementById(table_name);
    var time = 8;
    var count = 0;
    while (time < 18) {
        var new_row = document.createElement('tr');
        var new_item = document.createElement('td');
        var node_text = document.createTextNode(time.toString() + ':00');
        new_item.appendChild(node_text);
        new_row.appendChild(new_item);
        for (var i = 0; i < column_nb - 1; i++) {
            var temp_elem = document.createElement('td');
            var att1 = document.createAttribute('class');
            att1.value = 'myPopover'
            temp_elem.id = table_name + '_' + i + '_' + count;
//            var att2 = document.createAttribute('contenteditable');
//            att2.value = 'true';
            temp_elem.setAttributeNode(att1);
//            temp_elem.setAttributeNode(att2)
            new_row.appendChild(temp_elem);
        }
        table.appendChild(new_row);
        time++;
        count++;
    }
}

function updateTeacherTableElement(table_name) {

    teacherList = get_teacherlist_from_DB();

    var table = document.getElementById(table_name);
    var title_row = document.createElement('tr');
    var title_name1 = document.createElement('th');
    title_name1.appendChild(document.createTextNode('Time'));
    title_row.appendChild(title_name1);
    for(var i = 0; i< teacherList.length; i ++ ){
        var title_temp = document.createElement('th');
        title_temp.appendChild(document.createTextNode(teacherList[i].firstName));
        title_row.appendChild(title_temp);
    }
    table.appendChild(title_row);
    addTimeLine(table_name,teacherList.length+1);

}

main = {
    addTeacher : function(firstName, lastName, address) {
        teacherDB.addTeacher(firstName, lastName, address);
    },
    addTeacherObject : function(teacher) {
        teacherDB.addTeacherObject(teacher);
    },
    addStudent : function(firstName, lastName, address) {
        studentDB.addStudent(firstName, lastName, address);
    },
    addStudentObject : function(student) {
        studenDB.addStudentObject(student);
    },
    addAClass : function(name, teacher, client, duration, startTime,
        date, type) {
        // check teacher if exist, if not, create the teacher
        if(!teacherDB.hasTeacher(teacher)) {
            teacherDB.addTeacherObject(teacher);
        }
        if(!studentDB.hasStudent(client)) {
            studentDB.addStudentObject(client);
        }
        classDB.addAClass(name, teacher, client, duration, startTime,
        date, type);
    }
};

test = {
    addTeacherExamples : function() {
        jps = new Person.Teacher('jps', 'jsp', 'jsp', 8);
        ns = new Person.Teacher('ns', 'ns', 'ns', 9);
        bs = new Person.Teacher('bs', 'bs', 'bs', 'bs', 10);
        cheng = new Person.Teacher('cheng', 'cheng', 'cheng', 20);
        main.addTeacherObject(jps);
        main.addTeacherObject(ns);
        main.addTeacherObject(bs);
        main.addTeacherObject(cheng);
    }

};



window.onload = function () {
    initObjects();
    //addTimeLine('student_table', 4);
    updateTeacherTableElement('secretary_table', 4);
   update_secretary_table();



    update_secretary_table();
    update_student_table(find_a_client_by_name('stu1','stu1'));



    var options = {
        html: true,
        trigger: "hover focus",
        title: function () {
            return $("#popover-head").html();
        },
        content: function () {
            return $("#popover-content").html();
        }
    }
//    $.getScript("js/custom/controller.js", function () {
    $('.myPopover').popover(options);
//    });
    /*
    // Check browser support
    if (typeof(Storage) != 'undefined') {
        // Store
        localStorage.setItem('period1', '20');
        // Retrieve
        document.getElementById('student_table_0_0').innerHTML = localStorage.getItem('period1');
    } else {
        document.getElementById('student_table_0_0').innerHTML = 'Sorry, your browser does not support Web Storage...';
    }
    */
    
}