/**
 *
 * Ce qui ne vas pas :
 *
 * - pas de modèle de données coté JS
 * - tout le code applicatif est contenu dans une fonction anonyme de callback
 * - la manipulation du DOM (l'interface) est complètement mélangée au code applicatif
 *
 * Conséquences :
 *
 * - Difficile de faire évoluer l'application au fur et à mesure
 * - Maintenabilité réduite (la base de code va grossire "salement")
 * - Difficile de tester notre application correctement
 * - Grande dépendance à la librairie utilisée pour le DOM
 *
 *
 * Que proposez vous pour rémedier aux problèmes constatés plus haut ?
 * Par quoi commenceriez vous ?
 * Vous avez 2h :)
 *
 */

 var todoListApplication = {
    todoTaskList : [],
    deleteTaskList : []
};

todoListApplication.domElements = {
    entertask : "#create-task",
    task : "<li class='task-list__item'></li>",
    chkbx : "<input type='checkbox' class='done-chkbx'>",
    button : "<button class='suppress-btn'>⤬</button>",
    content : function(value) {
        return "<div class='item-content'>"+value+"</div>";
    }
};

todoListApplication.createTask = function createTask(value) {
    var task = $(todoListApplication.domElements.task);
    var chkbx = $(todoListApplication.domElements.chkbx);
    var button = $(todoListApplication.domElements.button);
    var content = $(todoListApplication.domElements.content(value));
    task.append(content);

    model.createTask(value);

    chkbx.on("change",function(){
        $(this).parent("li").toggleClass("task-list__item--done");
        console.log($(this).siblings("div"));
        model.finishTask($(this).siblings("div").html());
    });
    task.prepend(chkbx);

    button.on("click",function(){
        $(this).parent("li").remove();
        model.deleteTask($(this).siblings("div").html());
    });
    task.append(button);

    $("#todo-app ul").append(task);
};

$(document).ready(function(){

    $(todoListApplication.domElements.entertask).on("change", function() {
        todoListApplication.createTask($(this).val());

        $(todoListApplication.domElements.entertask).val("");
    });
});

