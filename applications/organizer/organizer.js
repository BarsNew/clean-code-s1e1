const addButton = document.querySelector(".organizer__button_add");
const incompleteTaskHolder = document.querySelector(".organizer__incompleted");
const completedTasksHolder = document.querySelector(".organizer__completed");
const addTaskInput = document.querySelector("#organizer-new-task");

const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput=document.createElement("input");
    const editButton=document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    editButton.innerText="Edit";

    checkBox.type="checkbox";
    editInput.type="text";
    
    label.className = "organizer__task";
    editInput.className = "organizer__input organizer__task";
    listItem.className = "organizer__li";
    editButton.className = "organizer__button organizer__button_edit";
    deleteButton.className = "organizer__button organizer__button_delete";

    deleteButtonImg.src = "image/remove.svg";

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

const addTask = function() {
    if (!addTaskInput.value) return;

    const listItem = createNewTaskElement(addTaskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    addTaskInput.value = "";
}

const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".organizer__button_edit");
    const containsClass = listItem.classList.contains("organizer__li_edit");
    
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } 
    else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("organizer__li_edit");
};

const deleteTask = function() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}

const taskCompleted = function() {
    const listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    const listItem = this.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

/*
const ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.addEventListener("click",ajaxRequest);
*/

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector(".organizer__button_edit");
    const deleteButton = taskListItem.querySelector(".organizer__button_delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;
    
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}