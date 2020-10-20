var button = document.getElementById("button");
var newTodoItem = document.getElementById("newTodo");
// var list = document.getElementById("checklist");
var delButton = document.querySelectorAll(".delButt");
var checkListDone = document.getElementById("checklist-done");
var checkList = document.getElementById("checklist")

window.onload = function(){
    for (let i = 0; i < delButton.length; i++) {
        delButton[i].addEventListener("click", deleteItem);
    }
};

function validateNewItem() {
    if (newTodoItem.value.length > 0 && document.getElementById(newTodoItem.value) === null) {
        return true;
    } else {
        return false;
    }
}

function validateKeyPress(event) {
    if (validateNewItem() && event.keyCode === 13) {
        return true;
    } else {
        return false;
    }
}

function createItem(){
    var newLi = document.createElement("li");
    newLi.textContent = newTodoItem.value;
    newLi.setAttribute("class", " ");
    list.appendChild(newLi);
    newTodoItem.value = '';
    
    var newDel = document.createElement("button");
    newDel.addEventListener("click", deleteItem);
    newDel.textContent = "Delete";
    // newDel.setAttribute("class", "delButt");
    var lastLi = document.getElementById("list").lastElementChild;
    lastLi.appendChild(newDel);
}

function createCheckItem(){
    var newCheck = document.createElement("input");
    newCheck.type = "checkbox";
    newCheck.name = newTodoItem.value;
    var newCheckLabel = document.createElement("label");
    
    newCheckLabel.setAttribute("id", newTodoItem.value);
    checkList.appendChild(newCheckLabel);
    newCheckLabel.textContent = newTodoItem.value;
    newCheckLabel.insertAdjacentElement('afterbegin', newCheck);
   
    

    var newDel = document.createElement("button");
    newDel.addEventListener("click", deleteItem);
    newDel.textContent = "x";
    var lastLi = document.getElementById("checklist").lastElementChild;
    
    lastLi.appendChild(newDel);
    newTodoItem.value = '';


}

function buttonAddItem() {
    if(validateNewItem()){
        createCheckItem();
    }
}

function keyboardAddItem(event) {
    if(validateKeyPress(event)) {
        createCheckItem();
    }
}

function done(event) {

    var listItem = event.target
    var checkDoneItem = document.getElementById(listItem.name);

    if(checkDoneItem.classList.contains("done")){
            checkDoneItem.toggleAttribute("class");       
            checkList.appendChild(checkDoneItem);
        } else { 
            checkDoneItem.setAttribute("class", "done");   
            checkListDone.appendChild(checkDoneItem);     
        }

}

function deleteItem(e) {

    var rmv = e.target.parentNode;
    rmv.remove();

}

button.addEventListener("click", buttonAddItem);
newTodoItem.addEventListener("keypress", keyboardAddItem);
checkList.addEventListener("change", done);
checkListDone.addEventListener("change", done);

