/**
 * Created by benli on 16/10/14.
 */
popover = {
    updatePopoverConetent: function (divid) {
        if(typeof(tdb) == "undefined") {
            console.log("Teacher database is not loaded, please make sure it is loaded!");
            return;
        }

        var id_colume = parseInt(divid.substring(9, 10));
        var id_row = parseInt(divid.substring(10, 11));

        var theteacher = tdb.teacherList[id_colume];
    }
}