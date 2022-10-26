// ### EVENTS ###
var clickItem = function(e) {
    console.log("CLICK!");
}

var leftClickItem = function(e) {
    var mycontext = this.dataset.context;
    var myIndex = this.dataset.index;

    removeItem(mycontext, myIndex);
    
    renderView();
    saveStatus();

    e.preventDefault();
}

var newItemBtn = function(e) {
    document.getElementById("dialog-new-item").style.display = "block";
    document.getElementById("new-item-text").focus();
}

var newItemSave = function(e) {
    document.getElementById("dialog-new-item").style.display = "none";
    var newItemText = document.getElementById("new-item-text");
    if(newItemText.value != "") {
        addItem(newItemText.value);
    }
    newItemText.value = ""; // clean for next

    renderView();
    saveStatus();
}

var newItemClose = function(e) {
    document.getElementById("dialog-new-item").style.display = "none";
    document.getElementById("new-item-text").value = "";
}

var keyDownEvent = function(evt) {
    evt = evt || window.event;

    var isDialogOpen = document.getElementById("dialog-new-item").style.display == "block";

    console.log(evt.key);

    if (evt.key == "Enter" && isDialogOpen) {
        newItemSave(evt);
    } else if (evt.key == "Enter" && !isDialogOpen) {
        newItemBtn(evt);
    } else if (evt.key == "Escape" && isDialogOpen) {
        newItemClose(evt);
    }
}

