var colorIncId = [0];
var colorList = [
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]
];

var maxContexts = 5;

var itemsList = [
    ["Item1"],
    [],
    [],
    [],
    []
];
var currentContext = 0;

// create new item
function addItem(title) {
    if(typeof itemsList[currentContext] === 'undefined'){
        itemsList[currentContext] = [];
    }

    itemsList[currentContext].push(title);
}

function removeItem(context, index) {

    console.log(itemsList);

    console.log({
       'func': 'removeItem('+context+', '+index+')',
    })

    if (index > -1) {
        itemsList[context].splice(index, 1);
    }

    console.log(itemsList);
}

function getColor(context, index = 0) {
    var colorSize = (typeof colorList[context] === 'undefined') ? 0 : colorList[context].length;

    console.log({
        'colorSize': colorSize,
        'index': index,
        'colorList[context][index % colorSize]': 'colorList['+context+']['+(index % colorSize)+']',
        'result': colorList[context][index % colorSize]
    });

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
            newDiv.style.backgroundColor = getColor(cuxrrentContext, j);
            newDiv.dataset.context = currentContext;
            newDiv.dataset.index = j;
            newDiv.addEventListener('click', function () { console.log("AA") }, false)
            /*newDiv.onclick = function() {
                console.log("AA");
            };*/
            newDiv.oncontextmenu = leftClickItem;
    
            parentElem.append(newDiv);
        }

        parentElem.innerHTML += '<div class="item ghost" id="new-element-btn" onClick="newItemBtn">' +
            '<div class="title">Press ENTER to add a new item & right click to remove</div>' +
            '</div>';
    }
}



// MAIN START
loadStatus();

document.getElementById("btn-close").onclick = newItemClose;
document.getElementById("btn-save").onclick = newItemSave;
document.onkeydown = keyDownEvent;