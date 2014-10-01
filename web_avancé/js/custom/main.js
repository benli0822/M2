/**
 * Created by benli on 01/10/14.
 */
function add_time_line(table_name, column_nb) {
    var table = document.getElementById(table_name);
    var time = 8;
    var count = 0;
    while (time < 18) {
        var new_row = document.createElement("tr");
        var new_item = document.createElement("td");
        var node_text = document.createTextNode(time.toString() + ":00");
        new_item.appendChild(node_text);
        new_row.appendChild(new_item);
        for (var i = 0; i < column_nb - 1; i++) {
            var temp_elem = document.createElement("td");
            temp_elem.id = table_name + "_" +  i + "_" + count;
            new_row.appendChild(temp_elem);
        }
        table.appendChild(new_row);
        time++;
        count++;
    }
}

window.onload = function() {
    add_time_line("student_table", 3);
    add_time_line("secretary_table", 4);


    // Check browser support
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("period1", "20");
        // Retrieve
        document.getElementById("student_table_0_0").innerHTML = localStorage.getItem("period1");
    } else {
        document.getElementById("student_table_0_0").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}