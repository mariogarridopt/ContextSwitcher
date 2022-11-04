// ### EVENTS ###
var leftClickItem = function() {
    // do nothing
}

var rightClickItem = function() {
    var mycontext = this.dataset.context;
    var myIndex = this.dataset.index;

    removeItem(mycontext, myIndex);
    
    renderView();
    saveStatus();

    //e.preventDefault();
}

var newItemBtn = function() {
    document.getElementById("dialog-new-item").style.display = "block";
    document.getElementById("new-item-text").focus();
}

var newItemSave = function() {
    document.getElementById("dialog-new-item").style.display = "none";
    var newItemText = document.getElementById("new-item-text");
    if(newItemText.value != "") {
        addItem(newItemText.value);
    }
    newItemText.value = ""; // clean for next

    renderView();
    saveStatus();
}

var toggleHelpDialog = function(forceExit = false) {
    var helpDialog = document.getElementById("dialog-help");
    var isHelpDialogOpen = helpDialog.style.display == "block";

    if(isHelpDialogOpen || forceExit) {
        helpDialog.style.display = "none"
    } else {
        helpDialog.style.display = "block"
    }
}

var newItemClose = function() {
    document.getElementById("dialog-new-item").style.display = "none";
    document.getElementById("new-item-text").value = "";
}

var keyDownEvent = function(evt) {
    evt = evt || window.event;

    var isNewItemDialogOpen = document.getElementById("dialog-new-item").style.display == "block";

    if (evt.key == "Enter" && isNewItemDialogOpen) {
        newItemSave();
    } else if (evt.key == "Enter" && !isNewItemDialogOpen) {
        newItemBtn();
    } else if (evt.key == "Escape") {
        newItemClose();
        toggleHelpDialog(true);
    } else if (evt.key == "ArrowUp" && !isNewItemDialogOpen) {
        prevContext();
    } else if (evt.key == "ArrowDown" && !isNewItemDialogOpen) {
        nextContext();
    } else if (evt.key == "h" && !isNewItemDialogOpen) {
        toggleHelpDialog();
    }
}