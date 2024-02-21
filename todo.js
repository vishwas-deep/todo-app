
const listArray = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

console.log(listArray, 'list on load')

// Fetch date
function addZero(i) {
    return i < 10 ? "0" + i : i;
}

const fetchTime = () => {
    const d = new Date();
    const seconds = d.getSeconds();
    const minute = d.getMinutes();
    const hour = d.getHours();

    document.querySelector("#time").innerText = addZero(hour) + ':' + addZero(minute) + ":" + addZero(seconds);
}

window.onload = function () {
    const _date = document.getElementById("date");
    const getDate = new Date();

    let month = getDate.getMonth() + 1;
    let date = getDate.getDate();
    const year = getDate.getFullYear();

    const updatedDate = addZero(date) + "/" + addZero(month) + "/" + year;

    _date.innerText = updatedDate;

    // get time
    fetchTime();
    setInterval(fetchTime, 1000);

    // fetch list
    fetchList(listArray);
}

// create list
const _input = document.getElementById("input");
const _button = document.getElementById("button");

const fetchList = (listArray) => {
    const listItem = listArray.map((curElement) => {

        return `<div class="list">
                    <div class="listInfo"> 
                        <textarea disabled id="textarea">${curElement}</textarea>
                        <div class="icon">
                            <i class="fa fa-trash delete"></i>
                            <i class="fa fa-pencil edit"></i>
                        </div>
                    </div>

                    <div class="listButton">
                        <button class="saveButton"> Save </button>
                        <button class="cancelButton"> Cancel </button>

                    </div>

                </div>`;
    })
    const body = document.querySelector(".body");
    body.innerHTML = listItem.join("");
    triggerDeleteFunction();
    triggerEditFunction();
    triggerSaveFunction();
    triggerCancelFunction();
}

// handle add button
const handleButton = () => {
    const value = _input.value.trim();
    if (!value) {
        return;
    }
    listArray.push(_input.value);
    localStorage.setItem("list", JSON.stringify(listArray));

    _input.value = "";
    fetchList(listArray);
}
_button.addEventListener("click", handleButton);
_input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        handleButton();
    }
});


// handle delete button
const deleteElement = (index) => {
    listArray.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(listArray));
    fetchList(listArray);
}
const triggerDeleteFunction = () => {
    const deleteArray = document.querySelectorAll(".delete");
    deleteArray.forEach((currElement, index) => {
        currElement.addEventListener("click", () => {
            deleteElement(index);
        })
    })
};


// handling edit button
const handleEdit = (index) => {
    const _textArea = document.querySelectorAll("#textarea");
    _textArea[index].disabled = false;

    const listButton = document.querySelectorAll(".listButton");
    listButton[index].style.display = "block";
}
const triggerEditFunction = () => {
    const editArray = document.querySelectorAll(".edit");
    editArray.forEach((currElement, index) => {
        currElement.addEventListener("click", () => {
            handleEdit(index);
        })
    })
}


// handle cancel button
const handleCancel = (index) => {

    const listButton = document.querySelectorAll(".listButton");
    listButton[index].style.display = "none";

    const _textArea = document.querySelectorAll("#textarea");
    _textArea[index].disabled = true;

    const prevValue = listArray[index]
    _textArea[index].value = prevValue;
}

const triggerCancelFunction = () => {
    const cancelButton = document.querySelectorAll(".cancelButton");
    cancelButton.forEach((currElement, index) => {
        currElement.addEventListener("click", () => {
            handleCancel(index);
        })
    })

}


// handle save button
const handleSave = (index) => {
    const listButton = document.querySelectorAll(".listButton");
    listButton[index].style.display = "none";

    const _textArea = document.querySelectorAll("#textarea");
    _textArea[index].disabled = true;

    const newValue = _textArea[index].value;
    listArray.splice(index, 1, newValue);
    localStorage.setItem("list", JSON.stringify(listArray));

}

const triggerSaveFunction = () => {
    const saveButton = document.querySelectorAll(".saveButton");
    saveButton.forEach((currElement, index) => {
        currElement.addEventListener("click", () => {
            handleSave(index);
        })
    })

}

