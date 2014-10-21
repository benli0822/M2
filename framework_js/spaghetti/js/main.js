var myTodoApplication = {};

myTodoApplication.domElements = {};

myTodoApplication.domElements.entertask = "#create-task";

myTodoApplication.createTask = function createTask(val){
    var task = $("<li class='task-list__item'></li>");

    var content = $("<div class='item-content'>"+val+"</div>");
    var chkbx = $("<input type='checkbox' class='done-chkbx'>");
    var button = $("<button class='suppress-btn'>⤬</button>");

    task.append(content);

    chkbx.on("change",function(){
        $(this).parent("li").toggleClass("task-list__item--done");
    });
    task.prepend(chkbx);

    button.on("click",function(){
        $(this).parent("li").remove();
    });
    task.append(button);

    $("#todo-app ul").append(task);
};

myTodoApplication.init = function todoAppInit(){};

$(document).ready(function(){

    $("#create-task").on("change",function(){


        myTodoApplication.createTask($(this).val());
        $("#create-task").val("");
    });


});
