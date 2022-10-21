// add timer counters
function updateTimers () {
    var activeItems = document.querySelectorAll("#list .item.active");
    for (let index = 0; index < activeItems.length; index++) {
        const element = activeItems[index];
        var timer = element.lastElementChild;

        timer.dataset.minutes = parseInt(timer.dataset.minutes) + 1;

        if(timer.dataset.minutes >= 60) {
            element.lastElementChild.innerHTML = minutesToTime(timer.dataset.minutes);
        } else {
            element.lastElementChild.innerHTML = timer.dataset.minutes;
        }
    }    
}

// add click events
function loadEvents() {
    var items = document.querySelectorAll("#list .item");
    for (let index = 0; index < items.length - 1; index++) {
        items[index].onclick = function() {
            if( items[index].classList.contains("active") ) {
                items[index].classList.remove("active");
            } else {
                clearAllActive();
                items[index].classList.add("active");
            }
        };  

        items[index].oncontextmenu = function(e) {
            items[index].remove();
            writeSessionData();
            e.preventDefault();
        }
    }

    document.getElementById("new-element-btn").onclick = function() {
        document.getElementById("dialog-new-item").style.display = "block";
        document.getElementById("new-item-text").focus();
    }

    document.getElementById("btn-close").onclick = function() {
        document.getElementById("dialog-new-item").style.display = "none";
        document.getElementById("new-item-text").value = "";
    }

    document.getElementById("btn-save").onclick = function() {
        document.getElementById("dialog-new-item").style.display = "none";
        var title = document.getElementById("new-item-text").value;
        document.getElementById("new-item-text").value = "";
        if(title != "") {
            newItem(title, 0, false);
            writeSessionData();
            loadEvents();
        }
    }

    document.onkeydown = function(evt) {
        evt = evt || window.event;

        var isDialogOpen = document.getElementById("dialog-new-item").style.display == "block";

        console.log(evt.key);

        if (evt.key == "Enter" && isDialogOpen) {
            document.getElementById("btn-save").click();
        } else if (evt.key == "Enter" && !isDialogOpen) {
            document.getElementById("new-element-btn").click();
        } else if (evt.key == "Escape" && isDialogOpen) {
            document.getElementById("btn-close").click();
        }
    };
}

function clearAllActive() {
    var items = document.querySelectorAll("#list .item");
    for (let f = 0; f < items.length; f++) {
        items[f].classList.remove("active");
    }
}

// create new item
function newItem(title, timer = 0, active = true) {
    var parentElem = document.getElementById("list");
    var newDiv = document.createElement('div');
    newDiv.classList.add("item");
    if(active) {
        clearAllActive();
        newDiv.classList.add("active");
    }
    newDiv.innerHTML =  '<div class="title">' + title + '</div>' +
                        '<div class="timer" data-minutes="' + timer + '">' + timer + '</div>';

    randomColorElement(newDiv);
    parentElem.insertBefore(newDiv, document.getElementById("new-element-btn"));
}

//storage and data pressistance
function writeSessionData() {
    var items = document.querySelectorAll("#list .item");
    var newList = [];

    for (let f = 0; f < items.length - 1; f++) {
        newList.push({
            "title": items[f].firstElementChild.innerHTML,
            "timer": items[f].lastElementChild.dataset.minutes
        });
    }

    sessionStorage.setItem("ContextSwitcherList", JSON.stringify(newList));
}

function readSessionData() {
    var dataString = sessionStorage.getItem("ContextSwitcherList");

    var items = JSON.parse(dataString);

    if(items != null) {
        for (let j = 0; j < items.length; j++) {
            newItem(items[j].title, items[j].timer, false);
        }
    }
}

function randomFloat(min, max)
{
  return Math.random() * (max - min) + min;
}

function randomColorElement(elem) {
    var x = parseFloat(Math.random() * 170 + 50);
	var y = parseFloat(Math.random() * 170 + 50);
	var z = parseFloat(Math.random() * 170 + 50);
	var thergb = "rgb(" + x.toFixed(2) + "," + y.toFixed(2) + "," + z.toFixed(2) + ")";
	elem.style.background=thergb;
}

function padToTwoDigits(number) {
    return (number < 10 ? '0' : '') + number
}

function minutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60; 

    return hours + 'h' + padToTwoDigits(minutes);
}

readSessionData();
loadEvents();
setInterval(updateTimers, 30000); 
