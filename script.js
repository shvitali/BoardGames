var addToExisting = document.getElementById("addExistingGame"); // button Add game to existing
var addToWanted = document.getElementById("addWantedGame"); // button add game to wanted
var existingList = document.getElementById("exisitingGames"); // list - existing games 
var wantedList = document.getElementById("wantedGames"); // list - wanted games
var newGameInput = document.getElementById("newExistingGame"); // input - existing game name
var wantedGameInput = document.getElementById("newWantedGame"); // input - wanted game name
var listItems = document.querySelectorAll("li"); // list items - all the list items in the html

// Verifies if the input field is empty
function isInputEmpty(gameName) {
    if (gameName.length < 1) {
        return true;
    }
    return false;
}

// Adds new game from inputField to a list
function addNewGame(inputField, list) {
    var gameName = inputField.value;
    if (!isInputEmpty(gameName)) {
        var newListItem = document.createElement("li");
        newListItem.appendChild(document.createTextNode(gameName));
        list.appendChild(newListItem);
        //Adds Delete button for the last added button
        addDeleteButtonToLastItem(list, list.children.length-1);
        //Adds check option listener for the last added item
        newListItem.addEventListener("click", function () {
            addCheckOption(newListItem);
        });
        clearInputField(inputField);
    }
}

// Removes text from input field
function clearInputField(inputField) {
    inputField.value = "";
}

// Adds done class that allows line-through
function done(item) {
    item.classList.add(".done");
}

// Add to existing games - CLICK event listener
addToExisting.addEventListener("click", function () {
    addNewGame(newGameInput, existingList)
});

// Add to wanted games - CLICK event listener
addToWanted.addEventListener("click", function () {
    addNewGame(wantedGameInput, wantedList)
});

// Add to existing games - ENTER event listener
newGameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter")
        addToExisting.click();
});

// Add to wanted games - ENTER event listener
wantedGameInput.addEventListener("keypress", function (button) {
    if (button.charCode === 13) //or button.which === 13
    {
        addToWanted.click();
    }
});

//************************************************************************************************ */
//Check option
//************************************************************************************************ */

function addCheckOption (item)
{
    item.classList.toggle("done");
}

// Checks li entry (line through)
function checkListItems() {
    //var listItems = document.querySelectorAll("li");
    listItems.forEach(element => {
        element.addEventListener("click", function(){
            addCheckOption(element);
        });
    });
}

checkListItems();

//************************************************************************************************ */
//Delete button
//************************************************************************************************ */

function addDeleteButton(list, index) {
    var listEntries = list.children;
    var delButton = document.createElement("button");
    delButton.innerText = "Delete";
    delButton.classList.add("delete_button");
    delButton.setAttribute("index", index);
    listEntries[index].appendChild(delButton);
    delButton.addEventListener("click", function(){
        deleteEntry(list, delButton.getAttribute("index"));
    });
}

function addDeleteButtonToList(list) {
    for (var i = 0; i < list.children.length; i++) {
        addDeleteButton(list,i);
    }
}

function addDeleteButtonToLastItem(list, index) {
    addDeleteButton(list, index);
}

addDeleteButtonToList(existingList);
addDeleteButtonToList(wantedList);

//************************************************************************************************ */
//Deleting an Item
//************************************************************************************************ */

function deleteEntry (list, index)
{
    list.removeChild(list.children[index]); 
    updateDeleteButtonIndex(list);
}

function updateDeleteButtonIndex (list)
{
    for (let i = 0; i < list.children.length; i++) {
        list.children[i].getElementsByClassName("delete_button")[0].setAttribute("index", i);  
    }
}

//************************************************************************************************ */
//Other option for deleting an item --> Using parent -- NO NEED FOR INDEX
//************************************************************************************************ */

// function addDeleteButton(list, index) {
//     var listEntries = list.children;
//     var delButton = document.createElement("button");
//     delButton.innerText = "Delete";
//     delButton.classList.add("delete_button");
//     //delButton.setAttribute("index", index);
//     listEntries[index].appendChild(delButton);
//  -->    delButton.onclick = deleteEntry;  --- like listener
// //     delButton.addEventListener("click", function(){
// //         deleteEntry(list, delButton.getAttribute("index"));
// //     });


// function deleteEntry (element){
//     element.target.parentNode.remove();
// }
