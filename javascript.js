//Assign click listener to button. Creates new to do item
var button = document.getElementById("button");
button.addEventListener("click", buttonAddItem);

//Assign keyboard enter to text entry. Creates new to do item
var newTodoItem = document.getElementById("newTodo");
newTodoItem.addEventListener("keypress", keyboardAddItem);

//Assign change listener to checklist items. Moves to 'Completed' section
var checkList = document.getElementById("checklist");
checkList.addEventListener("change", done);

//Assign change listener to completed items list. Moves out of 'Completed' and to above checklist
var checkListDone = document.getElementById("checklist-done");
checkListDone.addEventListener("change", done);

//Initialise completed item count to 0
window.onload = function(){
    updateCompletedItems(); 
}

//Add new item when clicking Add Item button
function buttonAddItem() {

    if(validateNewItem()) {
        createCheckItem();
    }
}

//Add new item when pressing Enter
function keyboardAddItem(event) {

    if(validateKeyPress(event)) {
        createCheckItem();
    }
}

//Validate entry isn't empty and doesnt already exist
function validateNewItem() {
    if (newTodoItem.value.length > 0 && document.getElementById(newTodoItem.value) === null) {
        return true;
    } else {
        return false;
    }
}

//Validate the Enter key is pressed to add item to list
function validateKeyPress(event) {
    if (validateNewItem() && event.keyCode === 13) {
        return true;
    } else {
        return false;
    }
}

//Create a new to do item
function createCheckItem(){

    if (checkDefault()) { //Checks to see if its the first item in the list

        //Create new item
        let newItem = document.createElement("input");
        newItem.type = "checkbox";
        newItem.name = newTodoItem.value;
        let newItemLabel = document.createElement("label");
        newItemLabel.setAttribute("id", newTodoItem.value);
        checkList.appendChild(newItemLabel);
        newItemLabel.textContent = newTodoItem.value;
        newItemLabel.insertAdjacentElement('afterbegin', newItem);

        //Create delete button
        let newDel = document.createElement("img");
        newDel.addEventListener("click", deleteItem);
        newDel.src = 'xlogo.png';

        //Adds button to the new item
        let lastLi = document.getElementById("checklist").lastElementChild;
        lastLi.appendChild(newDel);

        //Reset the text box
        newTodoItem.value = '';

    }
}

//Check if item in checklist is default placeholder and removes it if it is
function checkDefault() {

    let allEntries = document.getElementsByTagName("label");

    if (allEntries[0].id === "default"){
        allEntries[0].remove();
        return true;
    } else {
        return true;
    }
}

//Move item to the completed list
function done(event) {

    let listItem = event.target
    let defaultItemCheck = document.getElementById(listItem.name);

    //If item is the default placeholder dont move it
    if (listItem.getAttribute('name') === "default" ) {
        return;
    } else {
        
        if(defaultItemCheck.classList.contains("done")) {
            
            //If the item is already in the done list then move to undone
            defaultItemCheck.toggleAttribute("class");   
            checkList.appendChild(defaultItemCheck);
            
            //Remove the default placeholder if checklist is empty
            if (document.getElementById("checklist").childElementCount > 1 && document.getElementsByTagName("label")[0].id === "default") {
                document.getElementsByTagName("label")[0].remove();
            }

        } else {
            
            //Move item to completed
            defaultItemCheck.setAttribute("class", "done");   
            checkListDone.appendChild(defaultItemCheck);
            
            //If no more items remain in checklist create placeholder
            if (document.getElementById("checklist").childElementCount === 0) {
                
                createPlaceholder();
            }
        }
        updateCompletedItems();
    }
}

//Delete item from any of the lists
function deleteItem(e) {

    let listItem = e.target;

    //If item is the default placeholder dont move it
    if (listItem.getAttribute('name') === "default" ) {

        return;

    } else {
        
        let rmv = e.target.parentNode;
        rmv.remove();
        
        //If no more items remain in checklist create placeholder
        if (document.getElementById("checklist").childElementCount === 0){

            createPlaceholder();

    }

    }
    updateCompletedItems();
}

//Count how many completed items there are
function updateCompletedItems() {

    let completedItemsCount = document.getElementById("checklist-done").childElementCount;
    let completedItemsTitelElement = document.getElementsByClassName("completedItemsTitle")[0];
    completedItemsTitelElement.textContent = completedItemsCount + " Completed Items";
    return;

}

//Create default placeholder when nothing left in checklist
function createPlaceholder() {

    //Create placeholder item
    var newCheck = document.createElement("input");
    newCheck.type = "checkbox";
    newCheck.name = "default";
    var newCheckLabel = document.createElement("label");
    newCheckLabel.setAttribute("id", "default");
    checkList.appendChild(newCheckLabel);
    newCheckLabel.textContent = "To Do Item...";
    newCheckLabel.insertAdjacentElement('afterbegin', newCheck);
    
    //Create delete button
    var newDel = document.createElement("img");            
    newDel.src = 'xlogo.png';
    var lastLi = document.getElementById("checklist").lastElementChild;   
    lastLi.appendChild(newDel);

    //Reset the text box
    newTodoItem.value = '';

}