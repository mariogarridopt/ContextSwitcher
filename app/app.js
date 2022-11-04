var colorIncId = [0];
var colorList = [
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"],
    ["#5a3b72", "#3f2d76", "#081664", "#04447b", "#065c6c"],
    ["#007a7a", "#004040", "#000000", "#3d0000", "#7a0000"],
    ["#191d32", "#282f44", "#453a49", "#6d3b47"]
];

var maxContexts = 5;

var itemsList = [];
var currentContext = 0;

// create new item
function addItem(title) {
    if(typeof itemsList[currentContext] === 'undefined'){
        itemsList[currentContext] = [];
    }
    itemsList[currentContext].push(title);
}

function removeItem(context, index) {
    if (index > -1) {
        itemsList[context].splice(index, 1);
    }
}

function getColor(context, index = 0) {
    var colorSize = (typeof colorList[context] === 'undefined') ? 0 : colorList[context].length;
    return colorList[context][index % colorSize];
}

//storage and data pressistance
function saveStatus() {
    db.saveObject(itemsList);
}

function saveDeleted(item) {
    db.addToHistory(item);
}

function loadStatus() {
    itemsList = db.getObject();

    var diff = maxContexts - itemsList.length;

    if(diff > 0) {
        for (let h = 0; h < diff; h++) {
            itemsList.push([]);
        }
    }
    renderView();
}

function renderView() {
    var parentElem = document.getElementById("list");

    parentElem.innerHTML = ""; // clear view

    if(typeof itemsList[currentContext] !== 'undefined'){
        for (let j = 0; j < itemsList[currentContext].length; j++) {
            var newDiv = document.createElement('div');
            newDiv.classList.add("item");
            newDiv.id = "item-id-" + j;
            newDiv.innerHTML =  '<div class="title">' + itemsList[currentContext][j] + '</div>';
            newDiv.style.backgroundColor = getColor(currentContext, j);
            newDiv.dataset.context = currentContext;
            newDiv.dataset.index = j;
    
            parentElem.appendChild(newDiv);
        }

        parentElem.innerHTML += '<div class="item ghost" id="new-element-btn" onClick="newItemBtn()">' +
            '<div class="title">Press ENTER to add a new item or H for help.</div>' +
            '</div>';

        document.getElementById("dialog-current-context").innerHTML = currentContext + 1;

        // add click Events
        for (let j = 0; j < itemsList[currentContext].length; j++) {
            var item = document.getElementById("item-id-" + j);
            item.onclick = leftClickItem;
            item.oncontextmenu = rightClickItem;
        }
        document.getElementById("new-element-btn").onclick = newItemBtn;

    }
}

function prevContext() {
    if (currentContext > 0){
        currentContext--;
    }else {
        currentContext = maxContexts - 1;
    }

    renderView();
}

function nextContext() {
    if (currentContext < maxContexts - 1){
        currentContext++;
    }else {
        currentContext = 0;
    }
    renderView();
}

// MAIN START
loadStatus();

document.getElementById("btn-close").onclick = newItemClose;
document.getElementById("btn-save").onclick = newItemSave;
document.onkeydown = keyDownEvent;