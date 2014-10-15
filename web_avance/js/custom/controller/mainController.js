/**
 * Created by CHENG Xiaojun et JIN Benli on 01/10/14.
 */
main = {
    /**
     * create a teacher object and add it to db
     * @param firstName
     * @param lastName
     * @param address
     */
    addTeacher: function (firstName, lastName, address) {
        tdb.addTeacher(firstName, lastName, address);
    },
    /**
     * add a exist teacher object to db
     * @param teacher
     */
    addTeacherObject: function (teacher) {
        tdb.addTeacherObject(teacher);
    },
    /**
     * create a student object and add it to db
     * @param firstName
     * @param lastName
     * @param address
     */
    addStudent: function (firstName, lastName, address) {
        tdb.addStudent(firstName, lastName, address);
    },
    /**
     * add a exist student object to db
     * @param student
     */
    addStudentObject: function (student) {
        sdb.addStudentObject(student);
    },
    /**
     * add a class and associate the teacher and the student
     * @param name
     * @param teacher
     * @param client
     * @param duration
     * @param startTime
     * @param date
     * @param type
     */
    addAClass: function (name, teacher, client, duration, startTime, date, type) {
        // check teacher if exist, if not, create the teacher
        if (!tdb.hasTeacher(teacher)) {
            tdb.addTeacherObject(teacher);
        }
        if (!sdb.hasStudent(client)) {
            sdb.addStudentObject(client);
        }
        cdb.addAClass(name, teacher, client, duration, startTime,
            date, type, sdb, tdb);
    },
    /**
     * take effect this time's operation to local storage
     */
    closeNormal: function () {
        sdb.close(1);
        tdb.close(1);
        cdb.close(1);
    },
    /**
     * take effect this  time's operation to local storage
     */
    closeException: function () {
        sdb.close(0);
        tdb.close(0);
        cdb.close(0);
    }
};

test = {
    /**
     * add some teacher examples
     */
    addTeacherExamples: function () {
        var jps = new Person.Teacher('jps', 'jsp', 'jsp');
        var ns = new Person.Teacher('ns', 'ns', 'ns');
        var bs = new Person.Teacher('bs', 'bs', 'bs');
        var cheng = new Person.Teacher('cheng', 'cheng', 'cheng');
        main.addTeacherObject(jps);
        main.addTeacherObject(ns);
        main.addTeacherObject(bs);
        main.addTeacherObject(cheng);
    },
    /**
     * add some test
     */
    addTestDataToDB: function () {
        var teacher = new Person.Teacher('testT', 'testT', 'lille1');
        var stu1 = new Person.Client('stu1', 'stu1', 'stu1');
        var stu2 = new Person.Client('stu2', 'stu2', 'stu2');
        main.addTeacherObject(teacher);
        main.addStudentObject(stu1);
        main.addStudentObject(stu2);
        cdb.addAClass('drive', teacher, stu1, 1, 8, '10-14', 'drive', sdb, tdb);
        cdb.addAClass('lecture', teacher, stu2, 1, 9, '10-14', 'lecture', sdb, tdb);
    }

};