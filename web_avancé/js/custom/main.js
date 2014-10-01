/**
 * Created by benli on 01/10/14.
 */
function initObjects() {
    cl = new Class.LectureClass('toto');

    teacherList = [];
    jps = new Person.Teacher('jps', 'jsp', 'jsp', 8);
    ns = new Person.Teacher('ns', 'ns', 'ns', 9);
    bs = new Person.Teacher('bs', 'bs', 'bs', 'bs', 10);
    cheng = new Person.Teacher('cheng', 'cheng', 'cheng', 20);
    teacherList.push(jps);
    teacherList.push(ns);
    teacherList.push(bs);
    teacherList.push(cheng);
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
            temp_elem.id = table_name + '_' + i + '_' + count;
            var att = document.createAttribute('contenteditable');
            att.value = 'true';
            temp_elem.setAttributeNode(att);
            new_row.appendChild(temp_elem);
        }
        table.appendChild(new_row);
        time++;
        count++;
    }
}

function editTable(table_name) {
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

window.onload = function () {
    initObjects();
    addTimeLine('student_table', 4);
    editTable('secretary_table', 4);

    // Check browser support
    if (typeof(Storage) != 'undefined') {
        // Store
        localStorage.setItem('period1', '20');
        // Retrieve
        document.getElementById('student_table_0_0').innerHTML = localStorage.getItem('period1');
    } else {
        document.getElementById('student_table_0_0').innerHTML = 'Sorry, your browser does not support Web Storage...';
    }
}